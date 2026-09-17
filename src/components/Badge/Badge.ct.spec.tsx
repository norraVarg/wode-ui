import { test, expect } from '@playwright/test';

test.describe('Badge', () => {
  test('default and danger variants render real, distinct background colors', async ({ mount }) => {
    const defaultBadge = await mount('Badge/Default');
    const defaultColor = await defaultBadge
      .getByText('Default')
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    const dangerBadge = await mount('Badge/Danger');
    const dangerColor = await dangerBadge
      .getByText('Danger')
      .evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(dangerColor).not.toBe(defaultColor);
  });
});
