import React from "react";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps {
  value?: string;
  isPasswordVisible: boolean;
  handlePasswordChange: Function;
  togglePasswordVisibility: Function;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  isPasswordVisible,
  handlePasswordChange,
  togglePasswordVisibility,
}) => {
  return (
    <div className={styles.passWrapper}>
      <input
        className="formInput"
        type={isPasswordVisible ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Password"
        value={value}
        required
        onChange={(e) => {
          handlePasswordChange(e);
        }}
      />
      <span className={styles.eye} onClick={() => togglePasswordVisibility()}>
        {isPasswordVisible ? (
          <img src="/EyeOpened.svg" />
        ) : (
          <img src="/EyeClosed.svg" />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;
