import { makeVar, InMemoryCache } from "@apollo/client";
import { CartLocalStorageI, CartTotalVarI } from "./types";
export const CartItemsVar = makeVar<CartLocalStorageI>([]);
export var CartTotalVar = makeVar<CartTotalVarI>({ total: 0 });
export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return CartItemsVar();
          },
        },
      },
    },
  },
});
