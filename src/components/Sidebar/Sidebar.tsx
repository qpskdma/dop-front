import React, { useRef, useState } from "react";
import styles from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import * as jwt from "jsonwebtoken";
import { TokenInfo } from "../../../services/types";

interface SideMenuProps {
  isSidebarActive: boolean;
  setIsSidebarActive: Function;
}

const Sidebar: React.FC<SideMenuProps> = ({
  isSidebarActive,
  setIsSidebarActive,
}) => {
  const [closeAnim, setCloseAnim] = useState(false);
  const containerRef = useRef(null);

  const pathname = usePathname();

  const handleMouseLeave = () => {
    setCloseAnim(true);
    return setTimeout(() => setIsSidebarActive(false), 400);
  };

  const token = localStorage.getItem("token") || "";
  const decoded = jwt.decode(token) as TokenInfo;

  return (
    <>
      <nav
        className={`${styles.container} ${isSidebarActive && styles.opened}
        ${closeAnim && styles.closed}`}
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.user}>
          <img src="/User.svg" alt="User" />
          <div>{decoded ? decoded.user : null}</div>
        </div>
        <ul className={styles.listWrapper}>
          <li>
            <Link
              href="/admin/clients"
              className={`${styles.element} ${
                pathname == "/admin/clients" ? styles.active : ""
              }`}
            >
              <img src="/Users.svg" alt="Users" />
              Clients
            </Link>
          </li>
          <li>
            <Link
              href="/admin/servers"
              className={`${styles.element} ${
                pathname == "/admin/servers" ? styles.active : ""
              }`}
            >
              <img src="/Server.svg" alt="Server" />
              Servers
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
