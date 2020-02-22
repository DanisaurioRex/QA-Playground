import { Then } from 'cucumber';
import { expect } from 'chai';
import { CartPage } from '../pages';
import { CreatedDataStack } from 'data_management';
import { IProduct } from 'models';
import { browser } from 'protractor';
const cartPage = new CartPage();

Then('The user navigates to Cart page', async function checkCartUrl() {
  return expect(await browser.getCurrentUrl()).to.be.equal(cartPage.getUrl(), 'Wrong page');
});

Then('The product {string} shows in the list', async function checkProducInCart(productName: string) {
  const product = (this.dataStack as CreatedDataStack).get(productName) as IProduct;

  return expect(await cartPage.getProductRowIndex(product.name)).to.be.above(0, `Product ${product.name} is not included on the cart`);
});

Then('The product {string} appears with the right total amount and quantity {int}', async function checkProductDetailsInCart(productName: string, quantity: number) {
  const product = (this.dataStack as CreatedDataStack).get(productName) as IProduct;
  const productIndex = await cartPage.getProductRowIndex(product.name);
  const total = Math.round(parseFloat(product.regular_price) * quantity * 100) / 100;

  expect(await cartPage.getProductTotalOnTable(productIndex)).to.be.equal(total, 'Worng Toal amount');
  return expect(await cartPage.getProductQuantityOnTable(productIndex)).to.be.equal(quantity, 'Worng Quantity');
});
