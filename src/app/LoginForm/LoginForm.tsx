import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";
import "@/components/Loader/Loader.scss";
import rest from "../../../services/rest";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

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
      router.push("/admin/clients");
    } catch (error) {
      setTextError("Incorrect login details");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    if (!(passwordInput instanceof HTMLInputElement)) {
      return;
    }
    if (passwordInput.type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsPasswordVisible(!isPasswordVisible);
    }
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setTextError("");
    setPassword(e.target.value);
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
        <PasswordInput
          isPasswordVisible={isPasswordVisible}
          handlePasswordChange={handlePasswordChange}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        {/* <div className={styles.passWrapper}>
          <input
            className="formInput"
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setTextError("");
              setPassword(e.target.value);
            }}
          />
          <span
            className={styles.eye}
            onClick={() => togglePasswordVisibility()}
          >
            {isPasswordVisible ? (
              <img src="/EyeOpened.svg" />
            ) : (
              <img src="/EyeClosed.svg" />
            )}
          </span>
        </div> */}
        <div className={styles.textError}>{textError}</div>
        <button type="submit" onClick={(event) => handleLogin(event)}>
          {isLoading ? <span className="loader"></span> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
