import { test } from "./fixtures/test-options.ts";
import { stepCounter } from "./page-objects/basePage.ts";
import type { SortOptions } from "./page-objects/inventoryPage.ts";

const sortTypes: SortOptions[] = [
  "Name (A to Z)",
  "Name (Z to A)",
  "Price (low to high)",
  "Price (high to low)",
];

test.describe("Sorting tests", () => {
  test.beforeEach(async ({ pm }) => {
    stepCounter.counter = 0;
    await pm.atBrowser.openApp();
    await pm.atLoginPage.waitForLoginBtn();
    const userData = pm.atBrowser.getUserInfo("standard_user");
    await pm.atLoginPage.fillUsername(userData.login);
    await pm.atLoginPage.fillPassword(userData.password);
    await pm.atLoginPage.clickLogin({ shouldSuccess: true });
    await pm.atInventoryPage.expectInventoryPageToBePresent();
  });

  for (const sortType of sortTypes) {
    test(`Sort inventory in ${sortType} order`, async ({ pm }) => {
      await pm.atInventoryPage.sortInventory(sortType);
      if (sortType.startsWith("Price")) {
        const itemPrices = await pm.atInventoryPage.getItemPrices();
        pm.atInventoryPage.expectInventoryDataToBeSorted(itemPrices, sortType);
      } else {
        const itemNames = await pm.atInventoryPage.getItemNames();
        pm.atInventoryPage.expectInventoryDataToBeSorted(itemNames, sortType);
      }
    });
  }
});
