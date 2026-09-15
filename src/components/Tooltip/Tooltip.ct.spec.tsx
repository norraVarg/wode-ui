import { test, expect } from '@playwright/test';

test.describe('Tooltip', () => {
  test('renders via a real portal with compiled styles', async ({ mount, page }) => {
    await mount('Tooltip/OpenByDefault');

    const popup = page.getByText('Helpful information');
    await expect(popup).toBeVisible();
    await expect(popup).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });
});
