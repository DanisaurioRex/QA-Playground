
import { AxiosResponse } from 'axios';
import { HttpClientService } from './base/http-client.service';
import { IProduct } from 'models';
import { HttpError } from '../exceptions/http-error';
const qs = require('qs');

export class ProductService extends HttpClientService {
  private readonly url = 'wp-json/wc/v3/products';

  public async createProduct(product: IProduct): Promise<AxiosResponse> {
    try {
      return await this.getSpecification().post(this.url, product);
    } catch (error) {
      throw new HttpError(`Error Creating product`, error);
    }
  }

  public async deleteProduct(productId: number): Promise<AxiosResponse> {
    try {
      return await this.getSpecification().delete(`${this.url}/${productId}`, qs.stringify({ force: true }));
    } catch (error) {
      throw new HttpError(`Error Deleting product`, error);
    }
  }
}
