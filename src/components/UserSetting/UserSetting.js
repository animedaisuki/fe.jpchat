import React, { useState } from "react";
import styles from "./UserSetting.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import UserSettingLeftContent from "./UserSettingLeftContent/UserSettingLeftContent";
import UserSettingRightContent from "./UserSettingRightContent/UserSettingRightContent";

export default function UserSetting() {
  const [primaryColor, setPrimaryColor] = useState("#389e38");
  const [accentColor, setAccentColor] = useState("#1a457f");
  const [aboutMe, setAboutMe] = useState("");

  return (
    <div className={styles.userSettingContainer}>
      <div className={styles.userSettingHeadingContainer}>
        <div className={styles.chatSettingsIconContainer}>
          <IoSettingsSharp size={25} />
        </div>
        <button className={styles.settingsFakeButton}>Settings</button>
      </div>

      <div className={styles.userSettingMainContainer}>
        <UserSettingLeftContent
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
        />
        <UserSettingRightContent
          primaryColor={primaryColor}
          accentColor={accentColor}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
        />
      </div>
    </div>
  );
}
