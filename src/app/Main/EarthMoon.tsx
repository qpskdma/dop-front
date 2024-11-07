import React, { useState, useEffect } from "react";
import styles from "./EarthMoon.module.scss";

interface EarthMoonProps {}

const EarthMoon: React.FC<EarthMoonProps> = ({}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setIsAnimating(true);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      setIsHovered(false);
    }
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className={styles.earthMoon}>
      <img
        src="http://salehriaz.com/404Page/img/earth.svg"
        className={`${styles.earth} ${isHovered ? styles.hovered : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleAnimationEnd}
      />
      <img
        className={styles.moon}
        src="http://salehriaz.com/404Page/img/moon.svg"
      />
    </div>
  );
};

export default EarthMoon;
