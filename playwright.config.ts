import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Pick the environment: `ENV=staging npm test`. Defaults to dev.
const ENV = process.env.ENV ?? 'dev';
dotenv.config({ path: path.resolve(__dirname, `config/env/.env.${ENV}`) });

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
  throw new Error(`BASE_URL is not set. Check that config/env/.env.${ENV} exists.`);
}

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 1,
  workers: isCI ? 2 : undefined,

  timeout: 30_000,
  expect: { timeout: 5_000 },

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
