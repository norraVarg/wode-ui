import { test, expect } from '@playwright/test';

test.describe('Checkbox', () => {
  test('checked checkbox has a real accent background, distinct from unchecked', async ({
    mount,
  }) => {
    const component = await mount('Checkbox/Controlled');
    const box = component.getByRole('checkbox');
    const uncheckedColor = await box.evaluate((el) => getComputedStyle(el).backgroundColor);

    await box.click();

    const checkedColor = await box.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(checkedColor).not.toBe(uncheckedColor);
  });

  test('disabled checkbox has reduced opacity', async ({ mount }) => {
    const component = await mount('Checkbox/Disabled');
    const opacity = await component
      .getByRole('checkbox')
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeLessThan(1);
  });
});
