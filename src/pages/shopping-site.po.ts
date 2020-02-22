import { browser, WebElement, element, by } from 'protractor';
import config = require('config');

export abstract class ShoppingSite {
  protected baseUrl = config.get('url');
  protected abstract url: string;

  public async open(page = '') {
    return await this.navigateToPage(page);
  }

  public getUrl(): string {
    return this.baseUrl + this.url;
  }

  public getSearchInput(): WebElement {
    return element(by.css('.site-header .widget_product_search input[type="search"]'));
  }

  public async getSearchInputValue(): Promise<string> {
    return await this.getSearchInput().getAttribute('value');
  }

  public async searchProduct(productName: string): Promise<void> {
    const searchInput = this.getSearchInput();
    await searchInput.clear();
    return await searchInput.sendKeys(productName);
  }

  protected async navigateToPage(page = ''): Promise<void> {
    const completeUrl = this.baseUrl + this.url + page;

    return this.navigateUrl(completeUrl);
  }

  protected async navigateUrl(url: string): Promise<void> {
    const currentUrl = await browser.getCurrentUrl();
    const samePage = currentUrl === url;

    return samePage ? await browser.refresh() : await browser.get(url);
  }
}
