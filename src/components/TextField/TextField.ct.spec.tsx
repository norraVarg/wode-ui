import { test, expect } from '@playwright/test';

test.describe('TextField', () => {
  test('renders with real compiled styles and label association', async ({ mount }) => {
    const component = await mount('TextField/Default');
    const input = component.getByLabel('Email');
    await expect(input).toBeVisible();
    await expect(input).not.toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
  });

  test('invalid input has a real border color', async ({ mount }) => {
    const component = await mount('TextField/Invalid');
    const input = component.getByLabel('Email');
    await expect(input).toHaveAttribute('data-invalid');
    await expect(input).not.toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
  });

  test('disabled input has reduced opacity', async ({ mount }) => {
    const component = await mount('TextField/Disabled');
    const opacity = await component
      .getByLabel('Email')
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeLessThan(1);
  });
});
