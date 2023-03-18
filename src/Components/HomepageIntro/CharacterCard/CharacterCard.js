import React from "react";
import styles from "./CharacterCard.module.scss";
import AyakaImg from "../../../assets/Characters/Ayaka/char-ayaka-small.png";
import YoimiyaImg from "../../../assets/Characters/Yoimiya/char-yoimiya-small.png";

export default function CharacterCard() {
  const characters = [
    {
      fname: "Kamisato",
      lname: "Ayaka",
      avatar: AyakaImg,
    },
    {
      fname: "Yoimiya",
      lname: "Chan",
      avatar: YoimiyaImg,
    },
  ];

  return (
    <div className={styles.homepageIntroCardsContainer}>
      {characters.map((character) => (
        <button className={styles.cardContainer}>
          <img
            className={styles.homepageCardImg}
            src={character.avatar}
            alt="shogun"
          />
          <div className={styles.homepageCardNameContainer}>
            <p>{character.fname}</p>
            <p>{character.lname}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
