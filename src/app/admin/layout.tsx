"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState } from "react";
import styles from "./layout.module.scss";
import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarActive(true);
  };
  return (
    <>
      <img
        className={styles.menuIcon}
        src="/BurgerMenu.svg"
        alt="BurgerMenu"
        onClick={() => setIsSidebarActive(true)}
        onMouseEnter={handleMouseEnter}
      />
      {isSidebarActive ? (
        <Sidebar
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
      ) : null}
      <LogoutBtn />
      {children}
    </>
  );
}
