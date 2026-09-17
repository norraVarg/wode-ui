import { test, expect } from '@playwright/test';

test.describe('Accordion', () => {
  test('opens a panel on trigger click with real compiled styles', async ({ mount }) => {
    const component = await mount('Accordion/Default');
    const trigger = component.getByRole('button', { name: 'Is it styled?' });
    const panel = component.getByText('Yes, it comes with default styles using Tailwind CSS.');

    await expect(panel).not.toBeVisible();

    await trigger.click();

    await expect(panel).toBeVisible();
    await expect(panel).not.toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  });

  test('open trigger icon has a real rotation', async ({ mount }) => {
    const component = await mount('Accordion/Default');
    const icon = component.getByRole('button', { name: 'Is it accessible?' }).locator('svg');
    // Tailwind v4 compiles rotate-180 to the standalone CSS `rotate`
    // property, not a `transform: rotate(...)` composition - so that's
    // the property this needs to check.
    const rotate = await icon.evaluate((el) => getComputedStyle(el).rotate);
    expect(rotate).not.toBe('none');
  });
});
