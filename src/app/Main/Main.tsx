import React from "react";

import styles from "./Main.module.scss";
import Header from "@/components/Header/Header";
import EarthMoon from "./EarthMoon";
import Footer from "@/components/Footer/Footer";

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  return (
    <>
      <Header isLogin={true} />
      <div className={styles.introContainer}>
        <div className={styles.introText}>
          <h1 className={styles.title}>
            DOP
            <br />
            Народный хостинг
          </h1>
          <p className={styles.subtitle}>Ваш надежный проводник в мире IT </p>
        </div>
        <EarthMoon />
        <div className={styles.glowingStars}>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
          <div className={styles.star}></div>
        </div>
      </div>
      <div className={styles.dopInfo}>
        <div>
          <p>Our projects:</p>
          <h3> DOP VPN </h3>
          <h3> Game server hosting (in development)</h3>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
