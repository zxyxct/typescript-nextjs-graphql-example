'use client';
import { ProductsI } from './types';
import { lazy, Suspense } from 'react';
import { Loading } from '@features/ui/loading';
const ProductGridItem = lazy(() =>
  import('@features/products/product-grid-item').then(module => ({
    default: module.ProductGridItem,
  }))
);
export const PaginatedProducts: React.FC<{
  products: ProductsI[];
  pagination: number;
}> = ({ products, pagination }) => {
  const productDetailsHandle = (index: number) => {
    console.log('should show the details of the product in a modal', index);
  };
  const renderProducts = [];
  if (products !== null) {
    for (let i = 0; i <= pagination - 1; i++) {
      renderProducts.push(
        <Suspense key={products[i].id + 's'} fallback={<Loading />}>
          <ProductGridItem
            key={products[i].id}
            product={products[i]}
            index={i}
            productDetailsHandle={productDetailsHandle}
          />
        </Suspense>
      );
    }
  }
  return <> {renderProducts} </>;
};
