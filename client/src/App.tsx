import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { View } from "./components";
import { Layout } from "./shared";

import "./App.style.scss";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <View />
      </Layout>
    </QueryClientProvider>
  );
};
