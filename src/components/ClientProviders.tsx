'use client';

import { Provider } from "react-redux";
import { store } from "../store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apolloClient";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {children}
      </Provider>
    </ApolloProvider>
  );
}
