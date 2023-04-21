import React from "react";
import styles from "./CharacterCardButton.module.scss";

export default function CharacterCardButton(props) {
  const { character, currentCharacter, setCurrentCharacter } = props;

  const onHandBtnClick = () => {
    setCurrentCharacter(character);
  };

  return (
    <>
      <button
        className={`${
          currentCharacter.fname === character.fname
            ? styles.cardContainerPressed
            : styles.cardContainer
        }`}
        onClick={onHandBtnClick}
      >
        <img
          className={styles.homepageCardImg}
          src={character.avatar}
          alt={character.fname}
        />
        <div className={styles.homepageCardNameContainer}>
          <p>{character.fname}</p>
          <p>{character.lname}</p>
        </div>
      </button>
    </>
  );
}
