import { test, expect } from '@playwright/test';

test.describe('Select', () => {
  test('renders via a real portal with compiled styles', async ({ mount, page }) => {
    await mount('Select/OpenByDefault');

    const option = page.getByRole('option', { name: 'Pro' });
    await expect(option).toBeVisible();
    await expect(option).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });
});
