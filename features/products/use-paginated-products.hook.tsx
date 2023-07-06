'use client';
import { ProductsI } from './types';
import { useEffect, useState, useCallback } from 'react';
export const UsePaginatedProducts = () => {
  const [products, setProducts] = useState<ProductsI[] | null>(null);
  const [pagination, setPagination] = useState<number>(5);
  const fetchProducts = useCallback(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(products => {
        for (const p of products) {
          p.stock = 5;
        }
        setProducts(products);
      });
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function nextProductsHandler() {
    if (products !== null && pagination + 5 <= products.length) {
      setPagination(pagination => pagination + 5);
    }
  }
  return { products, pagination, nextProductsHandler };
};
