import { useEffect } from 'react';
import { CartItemsVar, CartTotalVar } from '@graphql/cache';
import { useReactiveVar } from '@apollo/client';

export const CalculationTotal = () => {
  const cartItems = useReactiveVar(CartItemsVar);
  const cartTotal = useReactiveVar(CartTotalVar);
  const qty = cartItems.length;
  useEffect(() => {
    if (cartItems) {
      const values = cartItems.reduce(function (prev, current) {
        return prev + current.price * current.quantity;
      }, 0);
      CartTotalVar({ total: Number(values.toFixed(2)) });
    }
  }, [cartItems]);

  return { quantity: qty, total: cartTotal.total };
};
