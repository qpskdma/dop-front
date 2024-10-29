import React from "react";
import styles from "./LogoutBtn.module.scss";
import Link from "next/link";
import rest from "../../../services/rest";

interface LogoutBtnProps {}

const LogoutBtn: React.FC<LogoutBtnProps> = ({}) => {
  // const logout = () => {
  //     localStorage.removeItem("token");
  // };

  return (
    <Link href="/" onClick={() => localStorage.removeItem("token")}>
      <p className={styles.exitBtn}>
        Logout
        <span>
          <img src="/Exit.svg" alt="" />
        </span>
      </p>
    </Link>
  );
};

export default LogoutBtn;
