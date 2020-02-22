import { DataRepository } from '../../data';
import { ProductService } from '../services';
import { CreatedDataStack } from './created-data-queue';
import { IProduct } from 'models';
import { ICreatedData } from './interfaces';

export class DataManager {
  private productService = new ProductService();

  public async createProduct(productName: string): Promise<IProduct> {
    const product = DataRepository.getProductsData(productName);
    const createdProduct: IProduct = (await this.productService.createProduct(product)).data;

    return createdProduct;
  }

  public async deleteCreatedData(dataStack: CreatedDataStack) {
    let item: { name: string, data: ICreatedData};

    while (dataStack.hasElements()) {
      try {
        item = dataStack.pop();
        await this.productService.deleteProduct(item.data.id);
      } catch (error) {
        continue;
      }
    }
  }
}
