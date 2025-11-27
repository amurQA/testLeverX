import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage, step } from "./basePage";

export default class CheckoutInfoPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueBtn = page.getByTestId("continue");
  }

  @step((args) => `Fill info: ${JSON.stringify(args[0])}`)
  async fillInfo({
    firstName,
    lastName,
    postalCode,
  }: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await expect(
      this.firstName,
      "Wait for first name field to be visible"
    ).toBeVisible();
    await this.firstName.fill(firstName);
    await expect(
      this.firstName,
      "Expect first name value to be correct"
    ).toHaveValue(firstName);
    await expect(
      this.lastName,
      "Wait for last name field to be visible"
    ).toBeVisible();
    await this.lastName.fill(lastName);
    await expect(
      this.lastName,
      "Expect last name value to be correct"
    ).toHaveValue(lastName);
    await expect(
      this.postalCode,
      "Wait for postal code field to be visible"
    ).toBeVisible();
    await this.postalCode.fill(postalCode);
    await expect(
      this.postalCode,
      "Expect postal code value to be correct"
    ).toHaveValue(postalCode);
  }

  @step(() => `Click continue button`)
  async clickContinue() {
    await expect(
      this.continueBtn,
      "Wait for continue button to be visible"
    ).toBeVisible();
    await this.continueBtn.click();
    await expect(
      this.continueBtn,
      "Expect continue button not to be any more visible"
    ).not.toBeVisible();
  }
}
