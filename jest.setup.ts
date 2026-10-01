import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

declare global {
  var BASE_UI_ANIMATIONS_DISABLED: boolean | undefined;
}

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

// jsdom doesn't implement PointerEvent at all. Base UI's own click/press
// handling dispatches real PointerEvents internally, for consistent
// mouse/touch/pen behavior. Any interactive Base UI component needs this
// polyfilled to be clickable under Jest - not just Checkbox.
// Pointer capture and scrollIntoView are jsdom gaps in the same family.
// They're covered here too, ahead of need, so a future component with
// drag-select or keyboard-scrolled lists (Select, Menu, Combobox) doesn't
// hit the same failure again.
if (typeof window !== 'undefined' && !window.PointerEvent) {
  // Deliberately not `implements PointerEvent`: the DOM spec (and whichever
  // TypeScript version happens to check this - project-pinned or an
  // editor's own bundled version) keeps adding new PointerEvent properties
  // (altitudeAngle/azimuthAngle, then persistentDeviceId, ...). Asserting
  // full conformance here means this class breaks every time those types
  // grow, for no real benefit - the cast below already tells TypeScript
  // "trust this is a PointerEvent" at the one place it's actually used.
  class PointerEventPolyfill extends MouseEvent {
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
  // Not `implements ResizeObserver` - see the PointerEventPolyfill comment above for why.
  class ResizeObserverPolyfill {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverPolyfill as unknown as typeof window.ResizeObserver; // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion -- redundant under this project's pinned TypeScript today (ResizeObserverPolyfill currently matches ResizeObserver exactly), but kept deliberately: a newer/editor TypeScript version with a larger ResizeObserver would need this cast, and removing it just to satisfy today's lint is what caused this exact class of breakage twice already.
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
  // Not `implements IntersectionObserver` - see the PointerEventPolyfill comment above for why.
  class IntersectionObserverPolyfill {
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
      queueMicrotask(() => this.callback([entry], this as unknown as IntersectionObserver)); // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion -- same rationale as the window.IntersectionObserver assignment below: `this` only satisfies the callback's IntersectionObserver parameter by matching today's interface exactly, which isn't guaranteed under a different TypeScript version.
    }

    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver =
    IntersectionObserverPolyfill as unknown as typeof window.IntersectionObserver; // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion -- same rationale as the window.ResizeObserver assignment above.
}

// jsdom's CSS engine (nwsapi) has a pathological recursive-evaluation bug
// for the `:fullscreen` and `:modal` pseudo-classes. Per spec, a fullscreen
// element is implicitly modal, so nwsapi's `:modal` matcher checks
// `:fullscreen` too. But jsdom has no native Fullscreen API, so that check
// falls back to calling `element.matches(':fullscreen')` again - re-entering
// the very same selector-matching path.
//
// Floating UI's positioning logic (`isTopLayer`, from
// `@floating-ui/utils/dom`) calls `element.matches(':modal')` on every
// position computation, even a single one (e.g. from `autoUpdate`'s
// required initial call). Before this fix, that measurably took 20-30+
// real seconds per render of an open, anchored popup (Tooltip, Popover,
// Select, Menu).
//
// Short-circuiting both to false is accurate under jsdom: nothing can
// genuinely be fullscreen or a native <dialog>/popover top-layer element
// there.
if (typeof Element !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- rebound via .call() below
  const nativeMatches = Element.prototype.matches;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- redundant under this project's pinned TypeScript today (matches has a single plain signature here), but kept deliberately: a newer/editor TypeScript version declares Element.prototype.matches with extra tag-name-narrowing overloads (`this is HTMLElementTagNameMap[K]`, etc.) that this simple boolean-returning override can't satisfy without this cast - same pattern as the other polyfills above.
  Element.prototype.matches = function (this: Element, selector: string) {
    if (selector === ':fullscreen' || selector === ':modal') {
      return false;
    }
    return nativeMatches.call(this, selector);
  } as unknown as typeof Element.prototype.matches;
}
