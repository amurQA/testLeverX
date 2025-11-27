import { BasePage, step } from "./basePage";
import { expect, type Locator, type Page } from "@playwright/test";

export type SortOptions =
  | "Name (A to Z)"
  | "Name (Z to A)"
  | "Price (low to high)"
  | "Price (high to low)";

export default class InventoryPage extends BasePage {
  readonly burgerMenu: Locator;
  readonly burgerMenuPanel: Locator;
  readonly logout: Locator;
  readonly sortBtn: Locator;
  readonly inventoryItemsNames: Locator;
  readonly inventoryItemsPrices: Locator;
  readonly addBackpackToCartBtn: Locator;
  readonly removeBackpackFromCart: Locator;
  readonly cartBadge: Locator;
  readonly backPackItemPrice: Locator;
  readonly cartContainer: Locator;

  constructor(page: Page) {
    super(page);
    // burger menu can be a separate page object once scaled
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.burgerMenuPanel = page.locator(
      'xpath=//*[@id="menu_button_container"]/div/div[2]'
    );
    this.logout = this.burgerMenuPanel.getByText("Logout");
    this.sortBtn = page.getByTestId("product-sort-container");
    this.inventoryItemsNames = page.getByTestId("inventory-item-name");
    this.inventoryItemsPrices = page.getByTestId("inventory-item-price");

    this.addBackpackToCartBtn = page.getByTestId(
      "add-to-cart-sauce-labs-backpack"
    );
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartContainer = page.locator("#shopping_cart_container");
    this.removeBackpackFromCart = page.getByTestId(
      "remove-sauce-labs-backpack"
    );
    this.backPackItemPrice = this.removeBackpackFromCart
      .locator("..")
      .getByTestId("inventory-item-price");
  }

  @step(() => `Add backpack to cart and see remove button appear`)
  async addBackpackToCart() {
    await expect(
      this.addBackpackToCartBtn,
      "Wait for add to cart button to be visible (backpack)"
    ).toBeVisible();
    await this.addBackpackToCartBtn.click();
    await expect(
      this.addBackpackToCartBtn,
      "Wait for add to cart button to be hidden (backpack)"
    ).toBeHidden();
    await expect(
      this.removeBackpackFromCart,
      "Wait for remove button to be visible (backpack)"
    ).toBeVisible();
  }

  @step(() => `Assert number of items in cart badge`)
  async assertNumberOfItemsShownInBadge(expectedNumber: number) {
    await expect(
      this.cartBadge,
      "Wait for cart badge to be visible"
    ).toBeVisible();
    await expect(
      this.cartBadge,
      "Expect number of items in cart to be correct"
    ).toHaveText(expectedNumber.toString());
  }

  @step(() => `Assert no items are in cart badge`)
  async assertNoItemsAreInBadge() {
    await expect(
      this.cartContainer,
      "Wait for cart container to be visible"
    ).toBeVisible();
    await expect(
      this.cartBadge,
      "Wait for cart badge with numbers not to be visible"
    ).not.toBeVisible();
  }

  @step(() => `Go to cart page`)
  async goToCartPage() {
    await expect(
      this.cartBadge,
      "Wait for cart badge to be visible"
    ).toBeVisible();
    await this.cartBadge.click();
  }

  @step(() => `Open burger menu`)
  async openBurgerMenu() {
    await expect(
      this.burgerMenu,
      "Wait for button to open burger menu to be visible"
    ).toBeVisible();
    await this.burgerMenu.click();
    await expect(
      this.burgerMenuPanel,
      "Wait for burger menu to open"
    ).toBeVisible();
  }

  @step(() => `Click log out`)
  async clickLogout() {
    await expect(
      this.logout,
      "Expect logout button is present in left menu"
    ).toBeVisible();
    await this.logout.click();
    await expect(
      this.logout,
      "Expect logout button not to be present after click"
    ).toBeHidden();
  }

  @step(() => `Assert inventory page to be opened`)
  async expectInventoryPageToBePresent() {
    await expect(
      this.page,
      "Expect page to have 'inventory' in the url"
    ).toHaveURL(/inventory/);
  }

  @step((args) => `Sort inventory in the next order: ${args[0]}`)
  async sortInventory(label: SortOptions) {
    await expect(
      this.sortBtn,
      "Expect sort button to be visible"
    ).toBeVisible();
    await this.sortBtn.selectOption({ label });
  }

  @step(() => `Get item names`)
  async getItemNames(): Promise<string[]> {
    await expect(
      this.inventoryItemsNames.first(),
      "Expect first item in inventory to be visible"
    ).toBeVisible();
    const allItemsTexts = await this.inventoryItemsNames.allTextContents();
    return allItemsTexts;
  }
  @step(() => `Get item prices without currency`)
  async getItemPrices(): Promise<string[]> {
    await expect(
      this.inventoryItemsPrices.first(),
      "Expect first item in inventory to be visible"
    ).toBeVisible();
    const allItemsTexts = await this.inventoryItemsPrices.allTextContents();
    return allItemsTexts.map((arg) => arg.trim().replace("$", ""));
  }

  @step(() => `Get backpack item price`)
  async getBackpackItemPrice(): Promise<string> {
    await expect(
      this.backPackItemPrice,
      "Expect backpack item price to be visible"
    ).toBeVisible();
    const backpackItemPrice = await this.backPackItemPrice.textContent();
    expect(
      backpackItemPrice,
      "Expect backpack item price not to be null"
    ).not.toBeNull();
    return backpackItemPrice!.trim();
  }

  @step(
    (args) =>
      `Expect array (${args[0].join(", ")}) to be sorted in ${args[1]} order`
  )
  expectInventoryDataToBeSorted(arr: string[], order: SortOptions) {
    arr.forEach((arg) => {
      expect(arg, `Expect item data info to be defined`).toBeDefined();
      expect(arg.length, "Expect item data to have length").toBeGreaterThan(0);
    });
    switch (order) {
      case "Price (low to high)": {
        const numericArr = arr.map((arg) => Number(arg));
        numericArr.forEach((arg) =>
          expect(
            arg,
            `Expect price to be number after conversion to number`
          ).not.toBeNaN()
        );
        const sortedNumericArr = numericArr.toSorted((a, b) => a - b);
        expect(
          sortedNumericArr,
          `Expect prices to be sorted in ${order} order`
        ).toStrictEqual(numericArr);
        break;
      }
      case "Price (high to low)": {
        const numericArr = arr.map((arg) => Number(arg));
        numericArr.forEach((arg) =>
          expect(
            arg,
            `Expect price to be number after conversion to number`
          ).not.toBeNaN()
        );
        const sortedNumericArr = numericArr.toSorted((a, b) => b - a);
        expect(
          sortedNumericArr,
          `Expect prices to be sorted in ${order} order`
        ).toStrictEqual(numericArr);
        break;
      }
      case "Name (A to Z)": {
        const sortedArr = arr.toSorted((a, b) => a.localeCompare(b));
        expect(
          sortedArr,
          `Expect array to be sorted in ${order} order`
        ).toStrictEqual(arr);
        break;
      }
      case "Name (Z to A)": {
        const sortedArr = arr.toSorted((a, b) => b.localeCompare(a));
        expect(
          sortedArr,
          `Expect array to be sorted in ${order} order`
        ).toStrictEqual(arr);
        break;
      }
      default:
        throw new Error(`Unknown sort order: ${order}`);
    }
  }
}
