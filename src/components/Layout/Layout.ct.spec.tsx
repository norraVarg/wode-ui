import { test, expect } from '@playwright/test';

test.describe('Layout', () => {
  test('content scrolls independently while header and footer stay fixed', async ({ mount }) => {
    const component = await mount('Layout/Default');
    const header = component.getByText('Header');
    const footer = component.getByText('Footer');

    const headerBoxBefore = await header.boundingBox();
    const footerBoxBefore = await footer.boundingBox();

    await component.getByText('Content row 30').scrollIntoViewIfNeeded();

    const headerBoxAfter = await header.boundingBox();
    const footerBoxAfter = await footer.boundingBox();

    expect(headerBoxAfter?.y).toBe(headerBoxBefore?.y);
    expect(footerBoxAfter?.y).toBe(footerBoxBefore?.y);
  });
});
