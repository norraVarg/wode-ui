import { test, expect } from '@playwright/test';

test.describe('IconButton', () => {
  test('renders with real compiled styles and an accessible name', async ({ mount }) => {
    const component = await mount('IconButton/Primary');
    const button = component.getByRole('button', { name: 'Add item' });
    await expect(button).toBeVisible();
    await expect(button).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });
});
