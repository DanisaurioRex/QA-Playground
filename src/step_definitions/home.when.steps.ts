import { When } from 'cucumber';
import { HomePage } from '../pages';
import { Key } from 'protractor';
const homePage = new HomePage();

When('I Navigate to the homepage', async function navigateToHomePage() {
  return await homePage.open();
});

When('I Fill the search input with {string}', async function searchProduct(productName: string) {
  return await homePage.searchProduct(productName);
});

When('I Press the Enter key within the search input', async function searchProduct() {
  return await homePage.getSearchInput().sendKeys(Key.ENTER);
});

When('I Click on {string} product', async function openProduct(productName: string) {
  return await homePage.openProduct(productName);
});
