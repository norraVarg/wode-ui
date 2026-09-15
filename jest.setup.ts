import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Base UI's own documented escape hatch (internals/useAnimationsFinished.js):
// every open/close transition (Tooltip, Popover, Menu, Select, Dialog, ...)
// waits on real Element.getAnimations()/Web Animations API before considering
// itself settled. jsdom has no real animation engine, so without this flag
// that wait never resolves the way Base UI expects and tests hang for tens of
// real seconds instead of failing fast.
globalThis.BASE_UI_ANIMATIONS_DISABLED = true;

// jsdom doesn't implement matchMedia at all - ThemeProvider calls it on every
// render (even outside 'system' mode), so every test touching theming needs
// this stub. Defaults to "no preference" (matches: false).
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement PointerEvent at all - Base UI's own click/press
// handling dispatches real PointerEvents internally (for consistent
// mouse/touch/pen behavior), so any interactive Base UI component - not
// just Checkbox - needs this polyfilled to be clickable under Jest.
// Pointer capture and scrollIntoView are jsdom gaps in the same family,
// needed once components with drag-select or keyboard-scrolled lists
// (Select, Menu, Combobox) land, so they're covered here too rather than
// waiting to hit the same failure again per-component.
if (typeof window !== 'undefined' && !window.PointerEvent) {
  class PointerEventPolyfill extends MouseEvent implements PointerEvent {
    public pointerId: number;
    public width: number;
    public height: number;
    public pressure: number;
    public tangentialPressure: number;
    public tiltX: number;
    public tiltY: number;
    public twist: number;
    public pointerType: string;
    public isPrimary: boolean;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0;
      this.tangentialPressure = params.tangentialPressure ?? 0;
      this.tiltX = params.tiltX ?? 0;
      this.tiltY = params.tiltY ?? 0;
      this.twist = params.twist ?? 0;
      this.pointerType = params.pointerType ?? 'mouse';
      this.isPrimary = params.isPrimary ?? true;
    }

    getCoalescedEvents = () => [];
    getPredictedEvents = () => [];
  }
  window.PointerEvent = PointerEventPolyfill as unknown as typeof window.PointerEvent;
}

if (typeof Element !== 'undefined' && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom doesn't implement ResizeObserver at all - Floating UI's autoUpdate
// (used internally by every Base UI component with a positioned popup:
// Tooltip, Popover, Menu, Select, Combobox) uses it to track anchor/floating
// element size changes. Without this, tests that open a positioned popup
// hang indefinitely rather than failing loudly, since the missing observer
// breaks an internal promise chain silently instead of throwing visibly.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserverPolyfill implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverPolyfill;
}

// jsdom doesn't implement IntersectionObserver either. Floating UI's
// autoUpdate uses it to detect when the reference element scrolls out of
// view, and without a real constructor it falls back to always reading a 0
// ratio, which floating-ui's own comment says is deliberately throttled via
// a 1000ms setTimeout retry loop "to prevent an infinite loop of updates".
// This polyfill measurably reduced (but did not fully eliminate) the delay
// on tests that mount an open, positioned Base UI popup - Tooltip's test
// suite went from ~92s to ~64s with this in place. The remaining slowness
// is accepted as a known jsdom/Floating UI limitation rather than chased
// further: Jest tests for positioned popups assert logical state
// (data-open, presence) instead of real visibility/layout, and Playwright
// CT (a real browser) is the layer that verifies actual positioned
// rendering - see each component's *.ct.spec.tsx.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserverPolyfill implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    private readonly callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe(target: Element) {
      const rect = target.getBoundingClientRect();
      const entry: IntersectionObserverEntry = {
        isIntersecting: true,
        intersectionRatio: 1,
        target,
        boundingClientRect: rect,
        intersectionRect: rect,
        rootBounds: null,
        time: Date.now(),
      };
      queueMicrotask(() => this.callback([entry], this));
    }

    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver = IntersectionObserverPolyfill;
}
