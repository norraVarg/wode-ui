import { test, expect } from '@playwright/test';

test.describe('Dialog', () => {
  test('opens via a real portal with compiled styles and moves focus inside', async ({
    mount,
    page,
  }) => {
    const component = await mount('Dialog/Default');
    await component.getByRole('button', { name: 'Open dialog' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    // Dialog.IconClose is the first tabbable element in DOM order (it comes
    // before Header/Body/Footer in the story), so it - not Cancel - is what
    // Base UI's default initial-focus behavior actually focuses.
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
  });

  test('closes on close button click', async ({ mount, page }) => {
    const component = await mount('Dialog/Default');
    await component.getByRole('button', { name: 'Open dialog' }).click();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });

  test('closes on Escape key', async ({ mount, page }) => {
    const component = await mount('Dialog/Default');
    await component.getByRole('button', { name: 'Open dialog' }).click();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});
