"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/../store/store";
import AdminPage from "./AdminPage/AdminPage";
import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <Provider store={store}>
      <LogoutBtn />
      <AdminPage />
    </Provider>
  );
};

export default page;
