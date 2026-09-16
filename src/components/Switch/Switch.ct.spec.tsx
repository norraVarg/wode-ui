import { test, expect } from '@playwright/test';

test.describe('Switch', () => {
  test('uncontrolled switch starts checked', async ({ mount }) => {
    const component = await mount('Switch/Uncontrolled');
    await expect(component.getByRole('switch')).toHaveAttribute('data-checked');
  });

  test('controlled switch toggles on click', async ({ mount }) => {
    const component = await mount('Switch/Controlled');
    const toggle = component.getByRole('switch');
    await expect(toggle).toHaveAttribute('data-unchecked');

    await toggle.click();

    await expect(toggle).toHaveAttribute('data-checked');
  });

  test('disabled switch does not toggle on click', async ({ mount }) => {
    const component = await mount('Switch/Disabled');
    const toggle = component.getByRole('switch');
    await expect(toggle).toHaveAttribute('data-disabled');
    await expect(toggle).toHaveAttribute('data-unchecked');

    await toggle.click({ force: true });

    await expect(toggle).toHaveAttribute('data-unchecked');
  });
});
