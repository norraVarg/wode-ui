import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
  test('opens via a real portal with compiled styles', async ({ mount, page }) => {
    const component = await mount('Menu/Default');
    await component.getByRole('button', { name: 'Actions' }).click();

    const menu = page.getByRole('menu');
    const item = page.getByRole('menuitem', { name: 'New file' });
    await expect(item).toBeVisible();
    await expect(menu).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });

  test('checked checkbox item shows a visible indicator', async ({ mount, page }) => {
    const component = await mount('Menu/WithCheckboxItem');
    await component.getByRole('button', { name: 'View' }).click();

    const checkedItem = page.getByRole('menuitemcheckbox', { name: 'Show hidden files' });
    await expect(checkedItem).toHaveAttribute('aria-checked', 'true');
    await expect(checkedItem.locator('svg')).toBeVisible();

    const uncheckedItem = page.getByRole('menuitemcheckbox', { name: 'Show extensions' });
    await expect(uncheckedItem).toHaveAttribute('aria-checked', 'false');
  });
});
