import React from "react";
import styles from "./IntroductionCard.module.scss";

export default function introductionCard(props) {
  const {
    charImg,
    bannerImg,
    icon,
    position,
    title,
    firstPara,
    secondPara,
    thirdPara,
  } = props;
  return (
    <div className={styles.cardContainer}>
      {charImg && (
        <img
          className={`${styles.characterImg} 
        ${position === "left" && styles.left} 
        ${position === "center" && styles.center}`}
          src={charImg}
          alt="character"
        />
      )}
      <img className={styles.cardBannerImg} src={bannerImg} alt="castle" />
      <div className={styles.cardTextArea}>
        <img className={styles.iconImg} src={icon} alt="logo" />
        <h4>{title}</h4>
        <br />
        <p>{firstPara}</p>
        <br />
        <p>{secondPara}</p>
        <br />
        <p>{thirdPara}</p>
      </div>
    </div>
  );
}
