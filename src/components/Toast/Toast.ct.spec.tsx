import { test, expect } from '@playwright/test';

test.describe('Toast', () => {
  test('renders via a real portal with compiled styles', async ({ mount, page }) => {
    await mount('Toast/OpenByDefault');

    const toastEl = page.getByRole('dialog');
    await expect(toastEl).toBeVisible();
    await expect(toastEl).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });
});
