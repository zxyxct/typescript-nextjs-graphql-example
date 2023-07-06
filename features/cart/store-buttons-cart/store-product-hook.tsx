import { CartItemsVar } from '@graphql/cache';
import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { ProductsI } from '@features/products/types';
import { CartProductI } from '@graphql/types';
export function StoreItem({ product }: { product: ProductsI | CartProductI }): {
  addProduct: () => void;
  minusProduct: () => void;
  plusProduct: () => void;
  isInCart: boolean;
  quantity: number;
} {
  const cartItems = useReactiveVar(CartItemsVar);
  const id = product.id;
  const [productFromStore] = cartItems.filter(product => product.id === id);
  let isInCart = productFromStore ? true : false;

  const quantity = productFromStore?.quantity | 0;
  const addProduct = useCallback(() => {
    var itemCart = {
      ...product,
      quantity: 1,
    };
    if (!isInCart) {
      const cFalse = [...cartItems, itemCart];
      CartItemsVar(cFalse);
      localStorage.setItem('items', JSON.stringify(cFalse));
    }
  }, [cartItems]);
  const plusProduct = useCallback(() => {
    if (isInCart) {
      let hasChanged = false;
      let result = cartItems.map(e => {
        if (
          e.id === id &&
          e.quantity + 1 <= e.stock &&
          e.quantity + 1 <= 10000
        ) {
          hasChanged = true;
        } /*else {
          throw new Error("there are no more stock");
        }*/
        return e.id == id && e.quantity + 1 <= e.stock
          ? Object.assign({}, e, { quantity: e.quantity + 1 })
          : e;
      });
      if (hasChanged) {
        CartItemsVar(result);
        localStorage.setItem('items', JSON.stringify(result));
      }
    } else {
      console.log('HACKER MAN PLUS' + 'PLS add a honeypot here .');
    }
  }, [cartItems]);

  const minusProduct = useCallback(() => {
    if (isInCart) {
      var result = [...cartItems];
      for (let i in result) {
        if (result[i].id == id) {
          const newCantidad = result[i].quantity - 1;
          if (newCantidad <= 0) {
            result.splice(Number(i), 1);
          } else {
            result[i] = { ...result[i], quantity: newCantidad };
          }
        }
        if (result.length === 0) {
          result = [];
        }
      }
      CartItemsVar(result);
      localStorage.setItem('items', JSON.stringify(result));
    } else {
      console.log('HACKER MAN MINUS');
    }
  }, [cartItems]);

  return {
    addProduct,
    minusProduct,
    plusProduct,
    isInCart,
    quantity,
  };
}
