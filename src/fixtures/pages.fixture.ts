import { test as base } from '@playwright/test';
import { HomePage } from '@pages/HomePage';

type PageFixtures = {
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.goto();
    await use(home);
  },
});

export { expect } from '@playwright/test';