import { test, expect } from '@playwright/test';

test.describe('RadioGroup', () => {
  test('uncontrolled group starts with the default item checked', async ({ mount }) => {
    const component = await mount('RadioGroup/Uncontrolled');
    await expect(component.getByRole('radio', { name: 'Monthly' })).toHaveAttribute('data-checked');
    await expect(component.getByRole('radio', { name: 'Yearly' })).toHaveAttribute(
      'data-unchecked',
    );
  });

  test('controlled group switches the checked item on click', async ({ mount }) => {
    const component = await mount('RadioGroup/Controlled');
    const yearly = component.getByRole('radio', { name: 'Yearly' });
    await expect(yearly).toHaveAttribute('data-unchecked');

    await yearly.click();

    await expect(yearly).toHaveAttribute('data-checked');
    await expect(component.getByRole('radio', { name: 'Monthly' })).toHaveAttribute(
      'data-unchecked',
    );
  });

  test('disabled group does not change selection on click', async ({ mount }) => {
    const component = await mount('RadioGroup/Disabled');
    const yearly = component.getByRole('radio', { name: 'Yearly' });
    await expect(yearly).toHaveAttribute('data-disabled');

    await yearly.click({ force: true });

    await expect(yearly).toHaveAttribute('data-unchecked');
    await expect(component.getByRole('radio', { name: 'Monthly' })).toHaveAttribute('data-checked');
  });
});
