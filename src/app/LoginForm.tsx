import React from "react";
import styles from "./LoginForm.module.css";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  return (
    <div className={styles.page}>
      <form action="/submit_login" method="post" className={styles.loginForm}>
        <legend>Login</legend>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
