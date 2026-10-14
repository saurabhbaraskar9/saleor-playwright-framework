import { test, expect } from '@fixtures/pages.fixture';

test.describe('Home page', () => {
  test('shows the search box', async ({ homePage }) => {
    await expect(homePage.header.searchInput).toBeVisible();
  });

  test('search returns a matching product', async ({ homePage, page }) => {
    await homePage.header.search('Plimsolls');
    await expect(page.getByRole('link', { name: 'Plimsolls', exact: true })).toBeVisible();
  });

  test('opens a sub-category from the Apparel menu', async ({ homePage }) => {
    await homePage.header.openCategory('Apparel', 'Scarfs');
  });

  test('opens a sub-category whose name overlaps others', async ({ homePage }) => {
    await homePage.header.openCategory('Apparel', 'Shirts');
  });
});
