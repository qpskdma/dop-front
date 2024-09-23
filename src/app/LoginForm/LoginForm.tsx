import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import styles from "./LoginForm.module.scss";
import "@/components/Loader/Loader.scss";
import Loader from "@/components/Loader/Loader";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (username && password) {
      // router.push("/admin");
      fetchData();
    } else {
      setTextError("Enter data");
    }
  };

  async function fetchData() {
    setLoading(true);
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await axios.post(
        "https://api.dopserver.ru/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setData(response.data["access_token"]);
      router.push("/admin");
    } catch (error) {
      setTextError("Incorrect login details");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <form method="post" className={styles.loginForm}>
        <legend>Login</legend>
        <input
          className="formInput"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          onChange={(e) => {
            setTextError("");
            setUsername(e.target.value);
          }}
        />
        <input
          className="formInput"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setTextError("");
            setPassword(e.target.value);
          }}
        />
        <div className={styles.textError}>{textError}</div>
        <button type="submit" onClick={(event) => handleLogin(event)}>
          {isLoading ? <span className="loader"></span> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
