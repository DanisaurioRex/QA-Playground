import { IProduct} from 'models';
import * as _ from 'lodash';
import { productsData } from '.';

export class DataRepository {

    public static getProductsData(productName: string): IProduct {
        if (typeof productsData[productName]  === 'undefined') {
            throw new Error(`Product "${productName}" not found in product repository`);
        }

        return _.cloneDeep(productsData[productName]);
    }
}
