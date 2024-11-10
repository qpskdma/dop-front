import HeaderDefault from "@/components/Header/HeaderDefault";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import styles from "@/app/login/LoginForm.module.scss";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import rest from "../../../services/rest";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = ({}) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  async function handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!username || !password || !email) {
      setTextError("Enter data");
      return;
    }
    setLoading(true);
    const bodyData = {
      email: email,
      username: username,
      password: password,
    };
    try {
      await rest.post("/auth/register", bodyData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
        },
      });
      //   localStorage.setItem("token", response.data["access_token"]);
      router.push("/login");
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
      <HeaderDefault isLogin={false} />
      <form method="post" className={styles.loginForm}>
        <h6>Registration</h6>
        <input
          className="formInput"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          //   pattern="[a-zA-Z0-9]+"
          //   title="Letters and numbers only"
          onChange={(e) => {
            setTextError("");
            setEmail(e.target.value);
          }}
        />
        <input
          className="formInput"
          type="text"
          id="username"
          name="username"
          placeholder="Login"
          pattern="[a-zA-Z0-9]+"
          title="Letters and numbers only"
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
        <div className={styles.textError}>{textError}</div>
        <button type="submit" onClick={(event) => handleLogin(event)}>
          {isLoading ? <span className="loader"></span> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
