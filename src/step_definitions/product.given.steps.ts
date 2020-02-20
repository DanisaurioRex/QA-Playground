import { Given } from 'cucumber';
import { DataManager, CreatedDataStack } from '../data_management';

Given('The product {string} has already been created', async function createProduct(productName: string) {
  const dataManager = new DataManager();
  const product = await dataManager.createProduct(productName);

  return (this.dataStack as CreatedDataStack).push(productName, product);
});
