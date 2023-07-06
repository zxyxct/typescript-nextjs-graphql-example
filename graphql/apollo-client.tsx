import { ApolloClient, NormalizedCacheObject, createHttpLink } from "@apollo/client";
import { CustomInMemoryCache } from "./cache";

const link = createHttpLink({
  uri: "http://localhost:8080/query",
  credentials: "include",
});

export const CustomClient:ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: CustomInMemoryCache,
  link,
});
