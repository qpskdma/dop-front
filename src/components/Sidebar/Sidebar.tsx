import React, { useState } from "react";
import styles from "./Sidebar.module.scss";

interface SideMenuProps {
  isSidebarActive: boolean;
  setIsSidebarActive: Function;
}

const Sidebar: React.FC<SideMenuProps> = ({
  isSidebarActive,
  setIsSidebarActive,
}) => {
  const [closeAnim, setCloseAnim] = useState(false);

  return (
    <>
      <nav
        className={`${styles.container} ${isSidebarActive && styles.opened}
        ${closeAnim && styles.closed}`}
      >
        <img
          className={styles.closeBtn}
          src="/CloseBtn.svg"
          alt=""
          onClick={() => {
            setCloseAnim(true);
            return setTimeout(() => setIsSidebarActive(false), 400);
          }}
        />
        <div className={styles.user}>
          <img src="/User.svg" alt="" />
          <div>User228</div>
        </div>
        <ul>
          <li className={styles.element}>
            <img src="/Home.svg" alt="" width={"32px"} height={"32px"} />
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
