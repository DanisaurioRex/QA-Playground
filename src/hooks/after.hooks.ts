
import { After } from 'cucumber';
import { DataManager } from '../data_management';

After(async function after() {
  const dataManager = new DataManager();
  await dataManager.deleteCreatedData(this.dataStack);
  return Promise.resolve();
});
