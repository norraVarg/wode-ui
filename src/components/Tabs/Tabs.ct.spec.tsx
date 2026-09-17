import { test, expect } from '@playwright/test';

test.describe('Tabs', () => {
  test('active tab has a real border color, distinct from inactive', async ({ mount }) => {
    const component = await mount('Tabs/Default');
    const [activeColor, inactiveColor] = await Promise.all([
      component
        .getByRole('tab', { name: 'Account' })
        .evaluate((el) => getComputedStyle(el).borderBottomColor),
      component
        .getByRole('tab', { name: 'Password' })
        .evaluate((el) => getComputedStyle(el).borderBottomColor),
    ]);
    expect(activeColor).not.toBe(inactiveColor);
  });
});
