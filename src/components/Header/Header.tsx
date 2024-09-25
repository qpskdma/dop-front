"use client";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar/Sidebar";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const router = useRouter();
  const toExit = () => {
    router.back();
  };
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
        {/* нужно чтобы кнопка отображалась в зависимости от того выполнен ли вход */}
        <button className={styles.exitBtn} onClick={() => toExit()}>
          Logout
          <span>
            <img src="/Exit.svg" alt="" />
          </span>
        </button>
      </header>
    </>
  );
};

export default Header;
