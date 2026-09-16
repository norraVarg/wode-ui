import { test, expect } from '@playwright/test';

test.describe('Popover', () => {
  test('opens via a real portal with compiled styles', async ({ mount, page }) => {
    const component = await mount('Popover/Default');
    await component.getByRole('button', { name: 'Open popover' }).click();

    const popup = page.getByRole('dialog');
    await expect(popup).toBeVisible();
    await expect(popup).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });

  test('closes on close button click', async ({ mount, page }) => {
    const component = await mount('Popover/Default');
    await component.getByRole('button', { name: 'Open popover' }).click();

    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('closes on Escape key', async ({ mount, page }) => {
    const component = await mount('Popover/Default');
    await component.getByRole('button', { name: 'Open popover' }).click();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
