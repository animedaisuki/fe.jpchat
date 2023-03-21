import React, { useEffect, useState } from "react";
import styles from "./CharacterCardButton.module.scss";

export default function CharacterCardButton(props) {
  const { character, currentCharacter, setCurrentCharacter } = props;
  const [isCurrentCharacter, setIsCurrentCharacter] = useState(
    character.fname === currentCharacter.fname
  );

  const onHandBtnClick = () => {
    setCurrentCharacter(character);
  };

  useEffect(() => {
    //不要直接比较对象，这样很可能判断为false，应该比较id或name
    setIsCurrentCharacter(currentCharacter.fname === character.fname);
  }, [character, currentCharacter]);

  return (
    <>
      {isCurrentCharacter ? (
        <button
          className={styles.cardContainerPressed}
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
      ) : (
        <button className={styles.cardContainer} onClick={onHandBtnClick}>
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
      )}
    </>
  );
}
