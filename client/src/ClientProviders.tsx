'use client';

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apolloClient";
import { CookiesProvider } from 'react-cookie';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          {children}
        </Provider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
