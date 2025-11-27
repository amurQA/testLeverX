import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage, step } from "./basePage";

export default class CheckoutCompletePage extends BasePage {
  readonly completeHeader: Locator;
  readonly completeMessage: Locator;
  readonly home: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.getByTestId("complete-header");
    this.completeMessage = page.getByTestId("complete-text");
    this.home = page.getByTestId("back-to-products");
  }

  @step(() => `Assert messages in complete page`)
  async assertMessages({
    expectedHeaderTxt,
    expectedMessageTxt,
  }: {
    expectedHeaderTxt: string;
    expectedMessageTxt: string;
  }) {
    await Promise.all([
      expect
        .soft(this.completeHeader, "Wait for complete header to be visible")
        .toBeVisible(),
      expect
        .soft(this.completeMessage, "Wait for complete message to be visible")
        .toBeVisible(),
    ]);
    await Promise.all([
      expect
        .soft(this.completeHeader, "Expect complete header to be correct")
        .toHaveText(expectedHeaderTxt),
      expect
        .soft(this.completeMessage, "Expect complete message to be correct")
        .toHaveText(expectedMessageTxt),
    ]);
  }

  @step(() => `Click home button`)
  async clickHome() {
    await expect(this.home, "Wait for home button to be visible").toBeVisible();
    await this.home.click();
    await expect(
      this.home,
      "Expect home button not to be any more visible"
    ).not.toBeVisible();
  }
}
