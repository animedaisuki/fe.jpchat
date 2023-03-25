import React from "react";
import styles from "./CharacterCards.module.scss";
import CharacterCardButton from "./CharacterCardButton/CharacterCardButton";

export default function CharacterCards(props) {
  const { characters, currentCharacter, setCurrentCharacter } = props;

  return (
    <div className={styles.homepageIntroCardsContainer}>
      {characters.map((character) => (
        <CharacterCardButton
          key={character.id}
          character={character}
          currentCharacter={currentCharacter}
          setCurrentCharacter={setCurrentCharacter}
        />
      ))}
    </div>
  );
}
