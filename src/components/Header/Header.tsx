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
    <header className={styles.header} id="header">
      <a href="/" className={styles.logo}>
        <img src="/Logo.svg" alt="" />
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
          <a href="/">Rules</a>
        </li>
        <li>
          <a href="/registration">Registration</a>
        </li>
      </ul>
      {isLogin && (
        <button className="loginBtn" onClick={() => router.push("/login")}>
          Login
        </button>
      )}
      {isLogout && (
        <button className="loginBtn" onClick={() => router.push("/login")}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
