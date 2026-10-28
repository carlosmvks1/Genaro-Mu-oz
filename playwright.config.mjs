import { defineConfig } from '@playwright/test';

const BASE = 'http://127.0.0.1:4321/Genaro-Mu-oz/';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  retries: 1,
  workers: 2,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: BASE,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'movil-375', use: { viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
    { name: 'tableta-768', use: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true } },
    { name: 'escritorio-1440', use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321',
    url: BASE,
    reuseExistingServer: false,
    timeout: 90_000,
  },
});
