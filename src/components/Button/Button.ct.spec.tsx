import { test, expect } from '@playwright/test';

test.describe('Button', () => {
  test('renders the primary variant with real compiled styles', async ({ mount }) => {
    const component = await mount('Button/Primary');
    const button = component.getByRole('button');
    await expect(button).toBeVisible();
    await expect(button).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });

  test('renders the outline variant with a visible border', async ({ mount }) => {
    const component = await mount('Button/Outline');
    const button = component.getByRole('button');
    await expect(button).toBeVisible();
    const borderWidth = await button.evaluate((el) => getComputedStyle(el).borderWidth);
    expect(borderWidth).not.toBe('0px');
  });

  test('disabled button cannot be clicked', async ({ mount }) => {
    const component = await mount('Button/Disabled');
    await expect(component.getByRole('button')).toBeDisabled();
  });
});
