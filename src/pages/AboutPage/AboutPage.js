import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.scss";
import backgroundImage from "../../assets/AboutPage/about-bg.png";
import photoFrame from "../../assets/AboutPage/photo_frame.png";
import globalIcon from "../../assets/AboutPage/global-icon.png";
import thumbnail from "../../assets/AboutPage/thumbnail.png";
import register from "../../assets/AboutPage/about-button.png";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainContainerRef = useRef(null);

  const handleScroll = () => {
    const position = mainContainerRef.current.scrollTop;
    setScrollPosition(position);
  };

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    <div
      className={styles.aboutContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      ref={mainContainerRef}
      onScroll={handleScroll}
    >
      <div
        className={`${styles.overlay} ${
          scrollPosition <= 270 ? styles.hidden : undefined
        }`}
      ></div>
      <div
        className={`${styles.globalIconContainer} ${
          scrollPosition <= 270 ? undefined : styles.hidden
        }`}
      >
        <Link to="/">
          <img className={styles.globalIcon} src={globalIcon} alt="global" />
        </Link>
      </div>

      <div
        className={`${styles.aboutTitleContainer} ${
          scrollPosition <= 270 ? undefined : styles.hidden
        }`}
      >
        <p className={styles.aboutTitle}>Welcome to</p>
        <p className={styles.aboutTitle}>Amahane Chat</p>
      </div>

      <div className={styles.aboutMainContainer}>
        <div className={styles.aboutMainRelativeContainer}>
          <div className={styles.photoFrameContainer}>
            <div
              className={styles.photoFrame}
              style={{ backgroundImage: `url(${photoFrame})` }}
            ></div>
          </div>
          <div className={styles.live2dImgContainer}>
            <img
              className={styles.live2dImg}
              src={thumbnail}
              alt="live2d poster"
            />
          </div>
          <div className={styles.registerContainer}>
            <h3 className={styles.registerTitle}>Meet Your Own Cat Girl!</h3>
            <button className={styles.registerButton}>
              <img
                className={styles.registerButtonImg}
                src={register}
                alt={"register"}
              />
              <Link to="/register">
                <p className={styles.registerText}>Register</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
