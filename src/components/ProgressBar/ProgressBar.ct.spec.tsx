import { test, expect } from '@playwright/test';

test.describe('ProgressBar', () => {
  test('renders a real indicator width matching the value', async ({ mount }) => {
    const component = await mount('ProgressBar/Default');
    // Root itself carries role="progressbar"; Track is its first div child
    // (a sibling visually-hidden <span> Base UI renders isn't a div), and
    // the Indicator is Track's only div child.
    const track = component.getByRole('progressbar').locator('> div').first();
    const indicator = track.locator('div[style*="width"]');

    const trackBox = await track.boundingBox();
    const indicatorBox = await indicator.boundingBox();

    expect(trackBox).not.toBeNull();
    expect(indicatorBox).not.toBeNull();
    const ratio = (indicatorBox?.width ?? 0) / (trackBox?.width ?? 1);
    expect(ratio).toBeGreaterThan(0.3);
    expect(ratio).toBeLessThan(0.5);
  });

  test('complete state has a real distinct color from in-progress', async ({ mount }) => {
    const inProgress = await mount('ProgressBar/Default');
    const inProgressColor = await inProgress
      .getByRole('progressbar')
      .locator('> div')
      .first()
      .locator('div[style*="width"]')
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    const complete = await mount('ProgressBar/Complete');
    const completeColor = await complete
      .getByRole('progressbar')
      .locator('> div')
      .first()
      .locator('div[style*="width"]')
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(completeColor).not.toBe(inProgressColor);
  });
});
