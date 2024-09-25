import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearToken } from "@/../store/authSlice";
import styles from "./LogoutBtn.module.scss";

interface LogoutBtnProps {}

const LogoutBtn: React.FC<LogoutBtnProps> = ({}) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const toExit = () => {
    dispatch(clearToken());
    router.back();
  };
  return (
    <button className={styles.exitBtn} onClick={() => toExit()}>
      Logout
      <span>
        <img src="/Exit.svg" alt="" />
      </span>
    </button>
  );
};

export default LogoutBtn;
