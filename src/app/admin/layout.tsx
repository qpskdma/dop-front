"use client";

import React, { useState, ReactNode } from "react";
import styles from "./layout.module.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface layoutProps {
  children: ReactNode | never;
}

const InnerLayout: React.FC<layoutProps> = ({ children }) => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleMouseEnter = () => {
    setIsSidebarActive(true);
  };
  return (
    <>
      <Header isLogin={false} isLogout={true} />
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
      {children}
      <Footer />
    </>
  );
};

export default InnerLayout;
