import { test, expect } from '@playwright/test';

test.describe('Avatar', () => {
  test('fallback avatar is genuinely circular and colored', async ({ mount }) => {
    const component = await mount('Avatar/WithFallback');
    const root = component.getByText('JD').locator('..');
    await expect(root).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    const borderRadius = await root.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(borderRadius).not.toBe('0px');
  });

  test('small and large sizes render real, distinct box sizes', async ({ mount }) => {
    const small = await mount('Avatar/Small');
    const smallBox = await small.getByText('JD').locator('..').boundingBox();

    const large = await mount('Avatar/Large');
    const largeBox = await large.getByText('JD').locator('..').boundingBox();

    expect(smallBox?.width).toBeLessThan(largeBox?.width ?? 0);
  });

  test('image loads and replaces the fallback', async ({ mount }) => {
    const component = await mount('Avatar/WithImage');
    const image = component.getByAltText('Jane Doe');
    await expect(image).toBeVisible();
    await expect(component.getByText('JD')).not.toBeVisible();
  });
});
