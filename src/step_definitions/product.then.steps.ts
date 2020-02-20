import { Then } from 'cucumber';
import { expect } from 'chai';
import { ProductPage } from '../pages';
import { CreatedDataStack } from 'data_management';
import { IProduct } from 'models';
const productPage = new ProductPage();

Then('The product page loads properly', async function checkProductPage() {
  return expect(await productPage.isOpen()).to.be.equal(true, 'Product page is not loaded');
});

Then('The title of product {string} is displayed properly', async function checkProductTitle(productName: string) {
  const product = (this.dataStack as CreatedDataStack).get(productName) as IProduct;

  return expect(await productPage.getTitleText()).to.be.equal(product.name, 'Wrong title');
});

Then('The price of product {string} is displayed properly', async function checkProductPrice(productName: string) {
  const product = (this.dataStack as CreatedDataStack).get(productName) as IProduct;

  return expect(await productPage.getMainProductPrice()).to.be.equal(product.regular_price, 'Wrong Price');
});

Then('The quantity input shows {int} as the value', async function checkInputValue(expectedValue: string) {
  return expect(await productPage.getQuantityInputValue()).to.be.equal(expectedValue, 'Wrong Quantity on input value');
});

Then('Count of cart icon gets updated to {int}', async function checkCartCount(expectedCartCount: number) {
  const expectedLabel = `${expectedCartCount} items`;

  return expect(await productPage.getCartCountIconText()).to.be.equal(expectedLabel, 'Wrong Count of cart icon');
});
