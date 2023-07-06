'use client';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { CustomClient } from '../../graphql/apollo-client';
import { InitCart } from './init-cart';
import { CartButton } from '../../features/cart/cart-button/cart-button';
import { NormalizedCacheObject } from '@apollo/client';
const client: ApolloClient<NormalizedCacheObject> = CustomClient;
export const InitApp = ({ children }: { children: React.ReactNode }) => {
  InitCart();

  return (
    <ApolloProvider client={client}>
      <CartButton />
      {children}
    </ApolloProvider>
  );
};
