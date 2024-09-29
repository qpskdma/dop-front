import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SideMenuProps {
  isSidebarActive: boolean;
  setIsSidebarActive: Function;
}

const Sidebar: React.FC<SideMenuProps> = ({
  isSidebarActive,
  setIsSidebarActive,
}) => {
  const [closeAnim, setCloseAnim] = useState(false);

  const pathname = usePathname();

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
        <ul className={styles.listWrapper}>
          <li
            className={`${styles.element} ${
              pathname == "/admin/clients" ? styles.active : ""
            }`}
          >
            <img src="/Users.svg" alt="" />
            <Link href="/admin/clients">Clients</Link>
          </li>
          <li
            className={`${styles.element} ${
              pathname == "/admin/servers" ? styles.active : ""
            }`}
          >
            <img src="/Server.svg" alt="" />
            <Link href="/admin/servers">Servers</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
