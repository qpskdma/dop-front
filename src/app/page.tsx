"use client";

import LoginForm from "./LoginForm/LoginForm";
import { store } from "@/../store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}
