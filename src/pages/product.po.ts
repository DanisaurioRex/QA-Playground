import { ShoppingSite } from './shopping-site.po';
import { IProduct } from 'models';
import { element, by, WebElement, protractor, browser } from 'protractor';

export class ProductPage extends ShoppingSite {
  public url = 'product/';

  public getQuantityInput(): WebElement {
    return element(by.css('[name="quantity"]'));
  }

  public getTitleLabel(): WebElement {
    return element(by.className('product_title'));
  }

  public getAddToCartButton(): WebElement {
    return element(by.className('single_add_to_cart_button'));
  }

  public async getCartButton(): Promise<WebElement> {
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.className('cart-contents'))));
    return element(by.className('cart-contents'));
  }

  public async getCartCountLabel(): Promise<WebElement> {
    await browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.css('.cart-contents .count'))));
    return element(by.css('.cart-contents .count'));
  }

  public openProductDetail(product: IProduct): Promise<void> {
    return this.navigateUrl(product.permalink);
  }

  public async isOpen(): Promise<boolean> {
    return await element(by.id('primary')).isPresent();
  }

  public async getTitleText(): Promise<string>  {
    return await this.getTitleLabel().getText();
  }

  public async getMainProductPrice(): Promise<string>  {
    const currencySymbol = await element(by.css('.summary .price .woocommerce-Price-currencySymbol')).getText();
    const priceWithCurrencySimbol = await element(by.css('.summary .price .woocommerce-Price-amount')).getText();

    return priceWithCurrencySimbol.replace(currencySymbol, '');
  }

  public async getQuantityInputValue(): Promise<number>  {
    const input = this.getQuantityInput();

    return parseFloat(await input.getAttribute('value'));
  }

  public async setQuantity(quantity: number): Promise<void> {
    const input = this.getQuantityInput();
    await input.clear();
    return await input.sendKeys(quantity);
  }

  public async addToCart(): Promise<void> {
    return await this.getAddToCartButton().click();
  }

  public async goToCart(): Promise<void> {
    return await (await this.getCartButton()).click();
  }

  public async getCartCountIconText(): Promise<string>  {
    return await (await this.getCartCountLabel()).getText();
  }
}
