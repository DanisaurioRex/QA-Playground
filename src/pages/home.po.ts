import { ShoppingSite } from './shopping-site.po';
import { element, by, ElementHelper, WebElement, browser, protractor } from 'protractor';

export class HomePage extends ShoppingSite {
  public url = '';

  public async isOpen(): Promise<boolean> {
    return await element(by.id('main')).isPresent();
  }

  public async getSearchResult(): Promise<WebElement> {
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.className('products'))));
    return await element(by.className('products'));
  }

  public async getProductCount(): Promise<number> {
    return await element.all(by.css('.products .product')).count();
  }

  public async openProduct(productName: string): Promise<void> {
    const product = element(by.xpath(`//li[contains(@class, "product")]//*[contains(text(), "${productName}")]`));

    if (await product.isPresent()) {
      return await product.click();
    } else {
      throw new Error(`Product ${productName} not found.`);
    }
  }
}
