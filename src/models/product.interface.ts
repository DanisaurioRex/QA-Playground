export interface IProduct {
  id?: number;
  name: string;
  type: string;
  regular_price: string;
  description: string;
  short_description: string;
  permalink?: string;
  categories?: string[][];
  images?: IImage[];
}

export interface IImage {
  src: string;
}
