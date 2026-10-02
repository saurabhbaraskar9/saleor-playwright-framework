import { type Page } from '@playwright/test';

export abstract class BasePage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
