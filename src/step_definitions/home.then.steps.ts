import { Then } from 'cucumber';
import { expect } from 'chai';
import { HomePage } from '../pages';
const homePage = new HomePage();

Then('The home page loads properly', async function checkHomePage() {
  return expect(await homePage.isOpen()).to.be.equal(true, 'Home page is not loaded');
});

Then('The search box is present in the header of the page', async function checkSearchBox() {
  return expect(await homePage.getSearchInput().isDisplayed()).to.be.equal(true, 'Search box is not present');
});

Then('Search input shows {string}', async function checkSearchInput(productName: string) {
  return expect(await homePage.getSearchInputValue()).to.be.equal(productName, 'Search box not contains typed value');
});

Then('The search results page shows up', async function checkSearchResults() {
  return expect(await (await homePage.getSearchResult()).isDisplayed()).to.be.equal(true, 'Search Results is not present');
});

Then('{int} products are displayed', async function checkSearchInput(numberOfProducts: number) {
  return expect(await homePage.getProductCount()).to.be.equal(numberOfProducts, 'Wrong number of products');
});
