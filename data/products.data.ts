import { IProduct } from 'models';
import faker = require('faker');

export const productsData: { [id: string]: IProduct; } = {
    Automation_Product_01: {
        name: 'A random product to perform automatic tests (AUTOMATION)',
        type: 'simple',
        regular_price: '30.99',
        description: faker.lorem.paragraphs(2),
        short_description: faker.random.words(10),
        images: [
          {
            src: faker.image.avatar(),
          },
        ],
    },
};
