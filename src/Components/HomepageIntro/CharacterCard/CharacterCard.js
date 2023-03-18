import React from "react";
import styles from "./CharacterCard.module.scss";

export default function CharacterCard() {
  return (
    <div className={styles.homepageIntroCardsContainer}>
      <button className={styles.cardContainer}>
        <img
          className={styles.homepageCardImg}
          src={require("../../../assets/Characters/Ayaka/char-ayaka-small.png")}
          alt="shogun"
        />
        <div className={styles.homepageCardNameContainer}>
          <p>Kamisato</p>
          <p>Ayaka</p>
        </div>
      </button>
    </div>
  );
}
