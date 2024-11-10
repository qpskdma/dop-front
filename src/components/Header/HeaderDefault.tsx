import React from "react";
import { useRouter } from "next/navigation";
import styles from "./HeaderDefault.module.scss";

interface HeaderDefaultProps {
  isLogin: boolean;
}

const HeaderDefault: React.FC<HeaderDefaultProps> = ({ isLogin }) => {
  const router = useRouter();

  return (
    <header className={styles.header} id="header">
      <div></div>
      <div>
        <a href="/" className={styles.logo}>
          <img src="/Logo.svg" alt="" />
          <h1>DOP</h1>
        </a>
      </div>
      <div>
        {isLogin ? (
          <button className="loginBtn" onClick={() => router.push("/login")}>
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default HeaderDefault;
