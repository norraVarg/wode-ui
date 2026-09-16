import { test, expect } from '@playwright/test';

test.describe('TextField', () => {
  test('renders with real compiled styles and label association', async ({ mount }) => {
    const component = await mount('TextField/Default');
    const input = component.getByLabel('Email');
    await expect(input).toBeVisible();
    await expect(input).not.toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
  });

  test('shows the error message when invalid', async ({ mount }) => {
    const component = await mount('TextField/Invalid');
    await expect(component.getByText('Enter a valid email address.')).toBeVisible();
  });

  test('disabled input cannot be typed into', async ({ mount }) => {
    const component = await mount('TextField/Disabled');
    await expect(component.getByLabel('Email')).toBeDisabled();
  });
});
