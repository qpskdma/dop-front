"use client";

import Main from "./Main/Main";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <Header isLogin={false} />
      <Main />
    </>
  );
}
