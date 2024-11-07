import React from "react";
import styles from "./LogoutBtn.module.scss";
import Link from "next/link";

interface LogoutBtnProps {}

const LogoutBtn: React.FC<LogoutBtnProps> = ({}) => {
  return (
    <div className={styles.wrapper}>
      <Link href="/login" onClick={() => localStorage.removeItem("token")}>
        <p className={styles.exitBtn}>
          Logout
          <span>
            <img src="/Exit.svg" alt="Exit" />
          </span>
        </p>
      </Link>
    </div>
  );
};

export default LogoutBtn;
