import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Saleor storefront home page (default channel, English locale). */
export class HomePage extends BasePage {
  protected readonly path = '/en/default';

  readonly searchInput: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('textbox', { name: 'Search for products' });
    this.cartLink = page.getByTestId('CartNavItem');
  }

  /** Searches the catalogue for the given term. */
  async searchFor(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  /** Opens a product by its exact display name. */
  async openProduct(name: string): Promise<void> {
    await this.page.getByRole('link', { name, exact: true }).click();
  }

  /** Opens the cart drawer. */
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
