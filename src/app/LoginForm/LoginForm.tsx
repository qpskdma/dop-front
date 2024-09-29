import React, { useState } from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";
import "@/components/Loader/Loader.scss";
import { useDispatch } from "react-redux";
import { setToken } from "@/../store/authSlice";
import rest from "../../../services/rest";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!email || !password) {
      setTextError("Enter data");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    try {
      const response = await rest.post("/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      localStorage.setItem("token", response.data["access_token"]);
      dispatch(setToken(response.data["access_token"]));
      router.push("/admin/clients");
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
