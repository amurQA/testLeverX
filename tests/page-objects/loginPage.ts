// For reviewers: click, fill, etc support auto-waiting but extra assertions are needed
// for better debug if test fails.
// Also, in real app it is better to share browser context
// between different cases not to login all the time at tests.
// Here this approach is not used

import { BasePage, step } from "./basePage";
import { expect, type Locator, type Page } from "@playwright/test";

export default class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator("#user-name");
    this.password = page.getByTestId("password");
    this.loginButton = page.locator('input[data-test="login-button"]');
    this.logo = page.getByText("Swag Labs");
    this.error = page.getByTestId("error");
  }

  @step((args) => `Fill username with value: ${args[0]}`)
  async fillUsername(name: string) {
    await expect(
      this.username,
      "Wait for username field to be visible"
    ).toBeVisible();
    await this.username.fill(name);
    await expect(
      this.username,
      `Expect username to have ${name} value`
    ).toHaveValue(name);
  }

  // for reviewers: for security reasons in real app it might be needed to hide actual password
  // but as for now it is better to have it in steps
  @step((args) => `Fill password field with value: ${args[0]}`)
  async fillPassword(passwordTxt: string) {
    await expect(
      this.password,
      "Wait for password field to be visible"
    ).toBeVisible();
    await this.password.fill(passwordTxt);
    await expect(
      this.password,
      "Wait for password field to have correct input"
    ).toHaveValue(passwordTxt);
  }

  @step(() => "Wait for login page logo")
  async waitForLoginPageLogo() {
    await expect(
      this.logo,
      "Wait for login logo to be stable to operate with page"
    ).toBeVisible();
  }

  @step(() => "Wait for login btn to be visible")
  async waitForLoginBtn() {
    await expect(
      this.loginButton,
      "Make sure that login btn is visible"
    ).toBeVisible();
  }

  @step(() => `Click login button for user`)
  async clickLogin({ shouldSuccess }: { shouldSuccess: boolean }) {
    await expect(
      this.loginButton,
      "Make sure that login btn is visible"
    ).toBeVisible();
    await this.loginButton.click();
    shouldSuccess
      ? await expect(
          this.loginButton,
          "Wait for login btn to disappear"
        ).not.toBeVisible()
      : await expect(
          this.loginButton,
          "Expect login btn still be visible"
        ).toBeVisible();
  }

  @step((args) => `Expect error message: '${args[0]}'`)
  async validateErrorAfterLogin(expectedErrorTxt: string) {
    await expect(this.error, "Wait for error message to appear").toBeVisible();
    await expect(
      this.error,
      "Expect correct validation error text to be in the message"
    ).toHaveText(expectedErrorTxt);
  }
}
