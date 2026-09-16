import { test, expect } from '@playwright/test';

test.describe('Switch', () => {
  test('checked switch has a real accent background, distinct from unchecked', async ({
    mount,
  }) => {
    const component = await mount('Switch/Controlled');
    const toggle = component.getByRole('switch');
    const uncheckedColor = await toggle.evaluate((el) => getComputedStyle(el).backgroundColor);

    await toggle.click();

    const checkedColor = await toggle.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(checkedColor).not.toBe(uncheckedColor);
  });

  test('disabled switch has reduced opacity', async ({ mount }) => {
    const component = await mount('Switch/Disabled');
    const opacity = await component
      .getByRole('switch')
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeLessThan(1);
  });
});
