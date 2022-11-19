import React from "react";

import { Chat, Form, TypingLabel } from "./components";
import { Layout } from "./shared";

import "./App.style.scss";

export const App = () => {
  return (
    <Layout>
      <Chat />
      <TypingLabel />
      <Form />
    </Layout>
  );
};
