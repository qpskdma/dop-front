import React from "react";
import styles from "./SideMenu.module.scss";

interface SideMenuProps {}

const SideMenu: React.FC<SideMenuProps> = ({}) => {
  return (
    <nav className={styles.container}>
      <ul>
        <li className={styles.element}>
          <img src="/Home.svg" alt="" />
          <a href="/">Home</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
