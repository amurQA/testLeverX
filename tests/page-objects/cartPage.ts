import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage, step } from "./basePage";

export default class CartPage extends BasePage {
  readonly itemQuantity: Locator;
  readonly backpackItemName: Locator;
  readonly itemPrice: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.itemQuantity = page.getByTestId("item-quantity");
    this.backpackItemName = page
      .getByTestId("item-4-title-link")
      .getByTestId("inventory-item-name");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.checkoutBtn = page.getByTestId("checkout");
  }

  @step((args) => `Assert number of items in cart: ${args[0]}`)
  async assertNumberOfItemsInCart(numberOfItems: number) {
    await expect(
      this.itemQuantity,
      "Wait for item quantity to be visible"
    ).toBeVisible();
    await expect(
      this.itemQuantity,
      "Expect number of items in cart to be correct"
    ).toHaveText(numberOfItems.toString());
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

  @step(() => `Assert item price`)
  async assertBackpackItemPrice(expectedPrice: string) {
    await expect(
      this.itemPrice,
      "Wait for item price to be visible"
    ).toBeVisible();
    await expect(this.itemPrice, "Expect item price to be correct").toHaveText(
      expectedPrice
    );
  }

  @step(() => `Click checkout button`)
  async clickCheckout() {
    await expect(
      this.checkoutBtn,
      "Wait for checkout button to be visible"
    ).toBeVisible();
    await this.checkoutBtn.click();
  }
}
