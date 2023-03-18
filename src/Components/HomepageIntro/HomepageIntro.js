import React from "react";
import styles from "./HomepageIntro.module.scss";
import CharacterCard from "./CharacterCard/CharacterCard";

export default function HomepageIntro() {
  return (
    <div className={styles.homepageIntroContainer}>
      <div className={styles.homepageIntroImgContainer}>
        <img
          className={styles.homepageIntroBackground}
          src={require("../../assets/HomepageBackground/homepageIntro1.jpg")}
          alt="mura"
        />
        <img
          className={styles.homepageIntroCharImg}
          src={require("../../assets/Characters/Ayaka/char-ayaka.png")}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharNameImg}
          src={require("../../assets/Characters/Ayaka/ayaka-name.png")}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharSnow}
          src={require("../../assets/Characters/snow-icon.png")}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharDescImg}
          src={require("../../assets/Characters/Ayaka/char-ayaka-desc.png")}
          alt="shogun"
        />
      </div>
      <CharacterCard />
    </div>
  );
}
