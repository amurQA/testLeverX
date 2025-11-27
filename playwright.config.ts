import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 4,
  reporter: "html",
  use: {
    baseURL: "https://www.saucedemo.com/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    testIdAttribute: "data-test",
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
