import { test } from "./fixtures/test-options.ts";

test.describe("Login tests", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.atBrowser.openApp();
    await pm.atLoginPage.waitForLoginPageLogo();
    await pm.atLoginPage.waitForLoginBtn();
  });

  test("Login and log out with standard user", async ({ pm }) => {
    const userData = pm.atBrowser.getUserInfo("standard_user");
    await pm.atLoginPage.fillUsername(userData.login);
    await pm.atLoginPage.fillPassword(userData.password);
    await pm.atLoginPage.clickLogin({ shouldSuccess: true });
    await pm.atInventoryPage.expectInventoryPageToBePresent();
    await pm.atInventoryPage.openBurgerMenu();
    await pm.atInventoryPage.clickLogout();
    await pm.atLoginPage.waitForLoginBtn();
  });

  test("Negative: login with locked out user", async ({ pm }) => {
    const userData = pm.atBrowser.getUserInfo("locked_out_user");
    await pm.atLoginPage.fillUsername(userData.login);
    await pm.atLoginPage.fillPassword(userData.password);
    await pm.atLoginPage.clickLogin({ shouldSuccess: false });
    await pm.atLoginPage.validateErrorAfterLogin(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
