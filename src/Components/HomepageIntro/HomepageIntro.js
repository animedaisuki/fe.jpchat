import React, { useState } from "react";
import styles from "./HomepageIntro.module.scss";
import CharacterCards from "./CharacterCards/CharacterCards";
import AyakaImg from "../../assets/Characters/Ayaka/char-ayaka.png";
import AyakaName from "../../assets/Characters/Ayaka/ayaka-name.png";
import AyakaDesc from "../../assets/Characters/Ayaka/char-ayaka-desc.png";
import YoimiyaImg from "../../assets/Characters/Yoimiya/char-yoimiya.png";
import YoimiyaName from "../../assets/Characters/Yoimiya/yoimiya-name.png";
import YoimiyaDesc from "../../assets/Characters/Yoimiya/char-yoimiya-desc.png";
import RaidenImg from "../../assets/Characters/Shogun/char-shogun.png";
import RaidenName from "../../assets/Characters/Shogun/shogun-name.png";
import RaidenDesc from "../../assets/Characters/Shogun/char-shogun-desc.png";
import VentiImg from "../../assets/Characters/Venti/char-venti.png";
import VentiName from "../../assets/Characters/Venti/venti-name.png";
import VentiDesc from "../../assets/Characters/Venti/char-venti-desc.png";
import KujouImg from "../../assets/Characters/Kujou/char-kujou.png";
import KujouName from "../../assets/Characters/Kujou/kujou-name.png";
import KujouDesc from "../../assets/Characters/Kujou/char-kujou-desc.png";
import NahidaImg from "../../assets/Characters/Nahida/char-nahida.png";
import NahidaName from "../../assets/Characters/Nahida/nahida-name.png";
import NahidaDesc from "../../assets/Characters/Nahida/char-nahida-desc.png";
import AyakaAvatar from "../../assets/Characters/Ayaka/char-ayaka-small.png";
import YoimiyaAvatar from "../../assets/Characters/Yoimiya/char-yoimiya-small.png";
import RaidenAvatar from "../../assets/Characters/Shogun/char-shogun-samll.png";
import VentiAvatar from "../../assets/Characters/Venti/char-venti-small.png";
import KujouAvatar from "../../assets/Characters/Kujou/char-kujou-small.png";
import NahidaAvatar from "../../assets/Characters/Nahida/char-nahida-small.png";

export default function HomepageIntro() {
  const ayaka = {
    fname: "Kamisato",
    lname: "Ayaka",
    image: AyakaImg,
    nameImg: AyakaName,
    descImg: AyakaDesc,
    avatar: AyakaAvatar,
  };
  const yoimiya = {
    fname: "Yoimiya",
    lname: "Chan",
    image: YoimiyaImg,
    nameImg: YoimiyaName,
    descImg: YoimiyaDesc,
    avatar: YoimiyaAvatar,
  };
  const raiden = {
    fname: "Raiden",
    lname: "Shogun",
    image: RaidenImg,
    nameImg: RaidenName,
    descImg: RaidenDesc,
    avatar: RaidenAvatar,
  };
  const venti = {
    fname: "Venti",
    lname: "Chan",
    image: VentiImg,
    nameImg: VentiName,
    descImg: VentiDesc,
    avatar: VentiAvatar,
  };
  const kujou = {
    fname: "Kujou",
    lname: "Sara",
    image: KujouImg,
    nameImg: KujouName,
    descImg: KujouDesc,
    avatar: KujouAvatar,
  };
  const nahida = {
    fname: "Nahida",
    lname: "Chan",
    image: NahidaImg,
    nameImg: NahidaName,
    descImg: NahidaDesc,
    avatar: NahidaAvatar,
  };

  const characters = [ayaka, yoimiya, raiden, venti, kujou, nahida];

  const [currentCharacter, setCurrentCharacter] = useState(ayaka);

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
          src={currentCharacter.image}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharNameImg}
          src={currentCharacter.nameImg}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharSnow}
          src={require("../../assets/Characters/snow-icon.png")}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroCharDescImg}
          src={currentCharacter.descImg}
          alt="shogun"
        />
        <img
          className={styles.homepageIntroLight}
          src={require("../../assets/Characters/light.png")}
          alt="light"
        />
      </div>
      <CharacterCards
        characters={characters}
        currentCharacter={currentCharacter}
        setCurrentCharacter={setCurrentCharacter}
      />
    </div>
  );
}
