import { test, expect } from '@playwright/test';

test.describe('Separator', () => {
  test('horizontal separator renders full width with a real background color', async ({
    mount,
  }) => {
    const component = await mount('Separator/Horizontal');
    const separator = component.getByRole('separator');
    await expect(separator).toBeVisible();
    await expect(separator).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });

  test('vertical separator has a real background color', async ({ mount }) => {
    const component = await mount('Separator/Vertical');
    const separator = component.getByRole('separator');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });
});
