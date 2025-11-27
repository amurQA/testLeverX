import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage, step } from "./basePage";

export default class CheckoutOverviewPage extends BasePage {
  readonly itemQuantity: Locator;
  readonly backpackItemName: Locator;
  readonly itemPrice: Locator;
  readonly finishBtn: Locator;
  readonly itemsTotal: Locator;
  readonly taxes: Locator;

  constructor(page: Page) {
    super(page);
    this.itemQuantity = page.getByTestId("item-quantity");
    this.backpackItemName = page
      .getByTestId("item-4-title-link")
      .getByTestId("inventory-item-name");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.finishBtn = page.getByTestId("finish");
    this.itemsTotal = page.getByTestId("subtotal-label");
    this.taxes = page.getByTestId("tax-label");
  }

  @step((args) => `Assert number of items in cart: ${args[0]}`)
  async assertNumberOfItemsInCart(expectedNumber: number) {
    await expect(
      this.itemQuantity,
      "Wait for item quantity to be visible"
    ).toBeVisible();
    await expect(
      this.itemQuantity,
      "Expect number of items in cart to be correct"
    ).toHaveText(expectedNumber.toString());
  }

  @step(() => `Click finish button`)
  async clickFinish() {
    await expect(
      this.finishBtn,
      "Wait for finish button to be visible"
    ).toBeVisible();
    await this.finishBtn.click();
    await expect(
      this.finishBtn,
      "Expect finish button not to be any more visible"
    ).not.toBeVisible();
  }

  @step(() => `Assert backpack item name`)
  async assertBackpackItemName() {
    await expect(
      this.backpackItemName,
      "Wait for backpack item name to be visible"
    ).toBeVisible();
    await expect(
      this.backpackItemName,
      "Expect backpack item name to be correct"
    ).toHaveText("Sauce Labs Backpack");
  }

  @step((args) => `Assert item price: ${args[0]}`)
  async assertBackpackItemPrice(expectedPrice: string) {
    await expect(
      this.itemPrice,
      "Wait for item price to be visible"
    ).toBeVisible();
    await expect(this.itemPrice, "Expect item price to be correct").toHaveText(
      expectedPrice
    );
  }
  @step((args) => `Assert items total: ${args[0]}`)
  async assertItemsTotal(expectedTotal: string) {
    await expect(
      this.itemsTotal,
      "Wait for items total to be visible"
    ).toBeVisible();
    await expect(
      this.itemsTotal,
      "Expect items total to be correct"
    ).toHaveText(expectedTotal);
  }
}
