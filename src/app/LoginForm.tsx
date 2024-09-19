import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./LoginForm.module.css";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();
    router.push("/admin");
    // Здесь можно добавить логику проверки данных, например, через запрос к серверу
    // В данном примере просто проверяем, что поля не пустые

    // if (username && password) {
    //   // Если данные верны, перенаправляем пользователя на следующую страницу
    //   router.push("/admin");
    // } else {
    //   alert("Неверные данные для входа");
    // }
  };

  return (
    <div className={styles.page}>
      <form action="/submit_login" method="post" className={styles.loginForm}>
        <legend>Login</legend>
        <label htmlFor="username">Username</label>
        <input
          className="formInput"
          type="text"
          id="username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="formInput"
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(event) => handleLogin(event)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
