import { test as basis } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

export type TestOptions = {
  pm: PageManager;
};

export const test = basis.extend<TestOptions>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
