import { test, expect } from '@playwright/test';

test.describe('Checkbox', () => {
  test('uncontrolled checkbox starts checked', async ({ mount }) => {
    const component = await mount('Checkbox/Uncontrolled');
    await expect(component.getByRole('checkbox')).toHaveAttribute('data-checked');
  });

  test('controlled checkbox toggles on click', async ({ mount }) => {
    const component = await mount('Checkbox/Controlled');
    const box = component.getByRole('checkbox');
    await expect(box).toHaveAttribute('data-unchecked');

    await box.click();

    await expect(box).toHaveAttribute('data-checked');
  });

  test('disabled checkbox does not toggle on click', async ({ mount }) => {
    const component = await mount('Checkbox/Disabled');
    const box = component.getByRole('checkbox');
    await expect(box).toHaveAttribute('data-disabled');
    await expect(box).toHaveAttribute('data-unchecked');

    await box.click({ force: true });

    await expect(box).toHaveAttribute('data-unchecked');
  });
});
