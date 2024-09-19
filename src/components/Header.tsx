"use client";
import React from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const toExit = () => {
    router.back();
  };
  return (
    <>
      <header className={styles.container}>
        <div></div>
        <h1 className={styles.logo}>
          D<span>O</span>P
        </h1>
        <button className={styles.exitBtn} onClick={() => toExit()}>
          Exit
          <span>
            <img src="/Exit.svg" alt="" />
          </span>
        </button>
      </header>
      <hr className={styles.hr} />
    </>
  );
};

export default Header;
