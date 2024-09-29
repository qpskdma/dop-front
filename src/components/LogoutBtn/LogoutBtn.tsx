import React from "react";
import styles from "./LogoutBtn.module.scss";
import Link from "next/link";

interface LogoutBtnProps {}

const LogoutBtn: React.FC<LogoutBtnProps> = ({}) => {
  return (
    <Link href="/">
      <button className={styles.exitBtn}>
        Logout
        <span>
          <img src="/Exit.svg" alt="" />
        </span>
      </button>
    </Link>
  );
};

export default LogoutBtn;
