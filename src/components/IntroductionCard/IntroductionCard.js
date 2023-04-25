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
      <img
        className={`${styles.characterImg} 
        ${position === "left" && styles.left} 
        ${position === "right" && styles.right}`}
        src={charImg}
        alt="character"
      />
      <div className={styles.cardBannerImgContainer}>
        <img className={styles.cardBannerImg} src={bannerImg} alt="castle" />
      </div>
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
