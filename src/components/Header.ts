import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
  readonly searchInput: Locator;
  readonly cartLink: Locator;
  readonly accountLink: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByRole('textbox', { name: 'Search for products' });
    this.cartLink = page.getByTestId('CartNavItem');
    // FIX ToDo 1: XPath + hardcoded '/en/default' (breaks when locale/channel change).
    //        Inspect the icon: does the <a> have an aria-label? Use role + name instead.
    this.accountLink = page.getByRole('link', { name: 'Log in' });
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openCategory(category: string, subCategory: string): Promise<void> {
    const trigger = this.page
      .getByRole('banner')
      .getByRole('button', { name: category, exact: true });
    const panel = this.page.locator('div[data-slot="mega-menu-panel"]');

    await expect(async () => {
      await trigger.hover();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true', { timeout: 1_000 });
    }).toPass({ timeout: 10_000 });

    const subCategoryLink = panel.getByRole('link', { name: subCategory, exact: true });
    await subCategoryLink.click();
    await expect(this.page).toHaveTitle(`${subCategory} | Saleor Store`);
  }
}
