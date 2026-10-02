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
});
