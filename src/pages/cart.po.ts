import { ShoppingSite } from './shopping-site.po';
import { element, by, ElementHelper, WebElement, browser } from 'protractor';

export class CartPage extends ShoppingSite {
  public url = 'cart/';

  public async isOpen(): Promise<boolean> {
    return await element(by.xpath('//*[@class="entry-title"][contains(text(), "Cart")]')).isPresent();
  }

  public async getProductRowIndex(productName: string): Promise<number> {
    const products = await element.all(by.css('[data-title="Product"]'));

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < products.length; i++) {
      const product: WebElement = products[i];
      if ((await product.getText()) === productName) {
        return i + 1;
      }
    }
    return -1;
  }

  public async getProductTotalOnTable(rowIndex: number): Promise<number> {
    const currencySymbol = await element(by.css('.current-menu-item .woocommerce-Price-currencySymbol')).getText();
    const total = await element(by.xpath(`//table/tbody/tr[${rowIndex}]/td[@data-title="Total"]`)).getText();

    return parseFloat(total.replace(currencySymbol, ''));
  }

  public async getProductQuantityOnTable(rowIndex: number): Promise<number> {
    return parseInt(await element(by.xpath(`//table/tbody/tr[${rowIndex}]/td[@data-title="Quantity"]//input`)).getAttribute('value'), 10);
  }
}
