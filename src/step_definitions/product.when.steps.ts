import { When } from 'cucumber';
import { ProductPage, ShoppingSite, HomePage } from '../pages';
import { CreatedDataStack } from 'data_management';
import { IProduct } from 'models';
const productPage = new ProductPage();

When('I Navigate to product detail of {string} product', async function navigateToProduct(productName: string) {
  const product = (this.dataStack as CreatedDataStack).get(productName) as IProduct;

  return await productPage.openProductDetail(product);
});

When('Increase the quantity number to {int}', async function setQuantity(quantity: number) {
  return await productPage.setQuantity(quantity);
});

When('I Click Add to cart button', async function addToCart() {
  return await productPage.addToCart();
});

When('Click on the Cart icon', async function goToCart() {
  return await productPage.goToCart();
});
