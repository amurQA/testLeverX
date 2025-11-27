import { test } from "./fixtures/test-options.ts";

test.describe("Buy tests", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.atBrowser.openApp();
    await pm.atLoginPage.waitForLoginPageLogo();
    await pm.atLoginPage.waitForLoginBtn();
  });

  test("Smoke: buy 1 item (backpack 🎒)", async ({ pm }) => {
    const userData = pm.atBrowser.getUserInfo("standard_user");
    await pm.atLoginPage.fillUsername(userData.login);
    await pm.atLoginPage.fillPassword(userData.password);
    await pm.atLoginPage.clickLogin({ shouldSuccess: true });
    await pm.atInventoryPage.expectInventoryPageToBePresent();
    await pm.atInventoryPage.addBackpackToCart();
    const backpackPrice = await pm.atInventoryPage.getBackpackItemPrice();
    await pm.atInventoryPage.assertNumberOfItemsShownInBadge(1);
    await pm.atInventoryPage.goToCartPage();
    await Promise.all([
      pm.atCartPage.assertNumberOfItemsInCart(1),
      pm.atCartPage.assertBackpackItemName(),
      pm.atCartPage.assertBackpackItemPrice(backpackPrice),
    ]);
    await pm.atCartPage.clickCheckout();
    await pm.atCheckoutInfoPage.fillInfo({
      firstName: "Max",
      lastName: "Pain",
      postalCode: "02-498",
    });
    await pm.atCheckoutInfoPage.clickContinue();
    await Promise.all([
      pm.atCheckoutOverviewPage.assertNumberOfItemsInCart(1),
      pm.atCheckoutOverviewPage.assertBackpackItemName(),
      pm.atCheckoutOverviewPage.assertBackpackItemPrice(backpackPrice),
      pm.atCheckoutOverviewPage.assertItemsTotal(
        `Item total: ${backpackPrice}`
      ),
    ]);

    await pm.atCheckoutOverviewPage.clickFinish();
    await pm.atCheckoutCompletePage.assertMessages({
      expectedHeaderTxt: "Thank you for your order!",
      expectedMessageTxt:
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    });
    await pm.atCheckoutCompletePage.clickHome();
    await pm.atInventoryPage.expectInventoryPageToBePresent();
    await pm.atInventoryPage.assertNoItemsAreInBadge();
  });
});
