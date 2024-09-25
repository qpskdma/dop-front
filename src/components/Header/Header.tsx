"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Sidebar from "../Sidebar/Sidebar";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <>
      {isSidebarActive ? (
        <Sidebar
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />
      ) : null}
      <header className={styles.container}>
        <img
          className={styles.menuIcon}
          src="/BurgerMenu.svg"
          alt="BurgerMenu"
          onClick={() => setIsSidebarActive(true)}
        />
        <h1 className={styles.logo}>
          D<span>O</span>P
        </h1>
        <div></div>
      </header>
    </>
  );
};

export default Header;
