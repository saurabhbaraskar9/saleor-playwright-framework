import { Header } from '@components/Header';
import { type Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly path: string;
  public readonly header: Header;

  constructor(protected readonly page: Page) {
    this.header = new Header(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
