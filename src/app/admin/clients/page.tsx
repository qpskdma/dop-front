"use client";

import React from "react";
import AdminPage from "../AdminPage/AdminPage";
import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
  return (
    <>
      {/* <LogoutBtn /> */}
      <AdminPage />
    </>
  );
};

export default page;
