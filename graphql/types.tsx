import { ProductsI } from '../features/products/types';

export type CartProductI = ProductsI & {
  quantity: number;
};

export type CartLocalStorageI = CartProductI[];

export type CartTotalVarI = { total: number };
