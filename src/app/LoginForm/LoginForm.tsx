import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.scss";
import "@/components/Loader/Loader.scss";
import rest from "../../../services/rest";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!username || !password) {
      setTextError("Enter data");
      return;
    }
    setLoading(true);
    const bodyData = {
      username: username,
      password: password,
    };
    try {
      const response = await rest.post("/auth/login", bodyData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
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
          type="username"
          id="username"
          name="username"
          placeholder="Login"
          required
          onChange={(e) => {
            setTextError("");
            setUsername(e.target.value);
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
