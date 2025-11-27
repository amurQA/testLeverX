import { BasePage } from "./basePage";
import LoginPage from "./loginPage";
import InventoryPage from "./inventoryPage";
import CartPage from "./cartPage";
import CheckoutInfoPage from "./checkoutInfoPage";
import CheckoutOverviewPage from "./checkoutOverviewPage";
import CheckoutCompletePage from "./checkoutCompletePage";
import type { Page } from "@playwright/test";

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly basePage: BasePage;
  private readonly inventoryPage: InventoryPage;
  private readonly cartPage: CartPage;
  private readonly checkoutInfoPage: CheckoutInfoPage;
  private readonly checkoutOverviewPage: CheckoutOverviewPage;
  private readonly checkoutCompletePage: CheckoutCompletePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.basePage = new BasePage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutInfoPage = new CheckoutInfoPage(this.page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
  }

  get atLoginPage() {
    return this.loginPage;
  }

  get atBrowser() {
    return this.basePage;
  }

  get atInventoryPage() {
    return this.inventoryPage;
  }
  get atCartPage() {
    return this.cartPage;
  }
  get atCheckoutInfoPage() {
    return this.checkoutInfoPage;
  }
  get atCheckoutOverviewPage() {
    return this.checkoutOverviewPage;
  }
  get atCheckoutCompletePage() {
    return this.checkoutCompletePage;
  }
}
