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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    if (email && password) {
      // router.push("/admin");
      fetchData();
    } else {
      setTextError("Enter data");
    }
  };

  async function fetchData() {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", email);
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
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setTextError("");
            setEmail(e.target.value);
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
