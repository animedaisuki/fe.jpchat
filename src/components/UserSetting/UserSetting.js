import React, { useContext, useEffect, useState } from "react";
import styles from "./UserSetting.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import UserSettingLeftContent from "./UserSettingLeftContent/UserSettingLeftContent";
import UserSettingRightContent from "./UserSettingRightContent/UserSettingRightContent";
import { UserContext } from "../../context/UserInfoProvider";
import { useSelector } from "react-redux";

export default function UserSetting() {
  const user = useContext(UserContext);
  const [primaryColor, setPrimaryColor] = useState(user?.primaryColor);
  const [accentColor, setAccentColor] = useState(user?.accentColor);
  const [aboutMe, setAboutMe] = useState(user?.aboutMe);

  const isNeedUpdate = useSelector(
    (state) => state.userSettingDetection.isNeedUpdate
  );

  useEffect(() => {
    setPrimaryColor(user?.primaryColor);
    setAccentColor(user?.accentColor);
    setAboutMe(user?.aboutMe);
  }, [user]);

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
      {!isNeedUpdate && (
        <div className={styles.notificationContainer}>
          <div className={styles.notificationDesc}>
            <p>Careful - you have unsaved changes!</p>
          </div>
          <div className={styles.updateButtonsContainer}>
            <button className={styles.resetButton}>Reset</button>
            <button className={styles.updateButton}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}
