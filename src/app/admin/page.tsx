"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/../store/store";
import AdminPage from "./AdminPage/AdminPage";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <Provider store={store}>
      <AdminPage />
    </Provider>
  );
};

export default page;
