import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <header className={styles.container}>
        <h1 className={styles.logo}>
          D<span>O</span>P
        </h1>
      </header>
    </>
  );
};

export default Header;
