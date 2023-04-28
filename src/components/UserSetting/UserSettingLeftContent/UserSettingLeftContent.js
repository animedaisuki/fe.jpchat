import React from "react";
import styles from "./UserSettingLeftContent.module.scss";
import { MdEdit } from "react-icons/md";

export default function UserSettingLeftContent(props) {
  const { color, setColor } = props;

  const handleColorBannerChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className={styles.userSettingLeftContainer}>
      <div className={styles.avatarChangeContainer}>
        <h6>AVATAR</h6>
        <button className={styles.avatarChangeButton}>Change Avatar</button>
      </div>
      <div className={styles.bannerChangeContainer}>
        <h6>BANNER COLOUR</h6>
        <div className={styles.bannerColorInputContainer}>
          <input
            className={styles.bannerColorInput}
            type="color"
            value={color}
            onChange={(e) => {
              handleColorBannerChange(e);
            }}
          />
          <div className={styles.editIconContainer}>
            <MdEdit size={15} />
          </div>
        </div>
      </div>
      <div className={styles.aboutMeContainer}>
        <h6>ABOUT ME</h6>
        <div className={styles.aboutMeInputContainer}>
          <textarea className={styles.aboutMeInput} />
        </div>
      </div>
    </div>
  );
}
