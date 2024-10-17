"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useState, ReactNode } from "react";
import styles from "./layout.module.scss";
import LogoutBtn from "@/components/LogoutBtn/LogoutBtn";

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
};

export default InnerLayout;
