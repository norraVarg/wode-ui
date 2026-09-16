import { test, expect } from '@playwright/test';

test.describe('RadioGroup', () => {
  test('checked item has a real accent border, distinct from unchecked', async ({ mount }) => {
    const component = await mount('RadioGroup/Uncontrolled');
    const [checkedColor, uncheckedColor] = await Promise.all([
      component
        .getByRole('radio', { name: 'Monthly' })
        .evaluate((el) => getComputedStyle(el).borderColor),
      component
        .getByRole('radio', { name: 'Yearly' })
        .evaluate((el) => getComputedStyle(el).borderColor),
    ]);
    expect(checkedColor).not.toBe(uncheckedColor);
  });

  test('disabled item has reduced opacity', async ({ mount }) => {
    const component = await mount('RadioGroup/Disabled');
    const opacity = await component
      .getByRole('radio', { name: 'Monthly' })
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeLessThan(1);
  });
});
