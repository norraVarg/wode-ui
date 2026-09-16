import { test, expect } from '@playwright/test';

test.describe('Spinner', () => {
  test('renders with a real spin animation', async ({ mount }) => {
    const component = await mount('Spinner/Default');
    const spinner = component.getByRole('status');
    await expect(spinner).toBeVisible();
    const animationName = await spinner.evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).not.toBe('none');
  });

  test('small and large sizes render real, distinct box sizes', async ({ mount }) => {
    // mount() navigates the page - concurrent mounts race each other, so
    // these must run sequentially rather than via Promise.all.
    const small = await mount('Spinner/Small');
    const smallBox = await small.getByRole('status').boundingBox();

    const large = await mount('Spinner/Large');
    const largeBox = await large.getByRole('status').boundingBox();

    expect(smallBox?.width).toBeLessThan(largeBox?.width ?? 0);
  });
});
