import React from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
