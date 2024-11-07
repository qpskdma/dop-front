import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.scss";

interface HeaderProps {
  isLogin: boolean;
  isLogout?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLogin, isLogout }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        <h1>DOP</h1>
      </a>
      <ul className={styles.navbar}>
        <li>
          <a href="/">About Us</a>
        </li>
        <li>
          <a href="/">API</a>
        </li>
        <li>
          <a href="/">Rools</a>
        </li>
        <li>
          <a href="/">Registration</a>
        </li>
      </ul>
      {isLogin && (
        <button
          className={styles.loginBtn}
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
      {isLogout && (
        <button
          className={styles.loginBtn}
          onClick={() => router.push("/login")}
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
