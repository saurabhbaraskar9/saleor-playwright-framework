import { test, expect } from '@playwright/test';
import { HomePage } from '@pages/HomePage';

test.describe('Home page', () => {
  test('shows the search box', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(home.searchInput).toBeVisible();
  });

  test('search returns a matching product', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.searchFor('Plimsolls');
    await expect(page.getByRole('link', { name: 'Plimsolls', exact: true })).toBeVisible();
  });

  test('opens a sub-category from the Apparel menu', async ({ page }) => {
    // TODO: create HomePage, goto, then use home.header.openCategory(...) with 'Beanies'
    const home = new HomePage(page);
    await home.goto();
    await home.header.openCategory('Apparel', 'Scarfs');
  });

  test('opens a sub-category whose name overlaps others', async ({ page }) => {
    // TODO: same, with 'Shirts' (this is your strict-mode regression test)
    const home = new HomePage(page);
    await home.goto();
    await home.header.openCategory('Apparel', 'Shirts');
  });
});
