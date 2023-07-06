import { CartProductI } from '@graphql/types';
import { ProductRow } from './product-row';
import { Stack } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { CartItemsVar } from '@graphql/cache';
export const ProductRowContainer = () => {
  const cartItems = useReactiveVar(CartItemsVar);
  return (
    <>
      <Stack padding=".5rem" height="70%" sx={{ overflowY: `scroll` }}>
        {cartItems
          ? cartItems.map((product: CartProductI, index: number) => {
              return (
                <ProductRow key={product.id} product={product} index={index} />
              );
            })
          : null}
      </Stack>
    </>
  );
};
