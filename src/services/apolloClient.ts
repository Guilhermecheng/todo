import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  //@ts-ignore
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT as string,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  return {
    headers: {
      ...headers,
      //@ts-ignore
      authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN as string}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //uri: import.meta.env.VITE_HYGRAPH_ENDPOINT as string,

  cache: new InMemoryCache(),
});

export default client;
