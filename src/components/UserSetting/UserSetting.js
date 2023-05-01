import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./UserSetting.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import UserSettingLeftContent from "./UserSettingLeftContent/UserSettingLeftContent";
import UserSettingRightContent from "./UserSettingRightContent/UserSettingRightContent";
import { UserContext } from "../../context/UserInfoProvider";
import { useDispatch, useSelector } from "react-redux";
import { userSettingDetectionActions } from "../../store/modules/userSettingDetectionSlice";

export default function UserSetting() {
  const user = useContext(UserContext);
  const [primaryColor, setPrimaryColor] = useState(user?.primaryColor);
  const [accentColor, setAccentColor] = useState(user?.accentColor);
  const [aboutMe, setAboutMe] = useState(user?.aboutMe);
  const [previewPic, setPreviewPic] = useState(null);

  const avatarInputFileRef = useRef();

  const isNeedUpdate = useSelector(
    (state) => state.userSettingDetection.isNeedUpdate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setPrimaryColor(user?.primaryColor);
    setAccentColor(user?.accentColor);
    setAboutMe(user?.aboutMe);
  }, [user]);

  const handleResetChanges = () => {
    avatarInputFileRef.current.value = null;
    setPreviewPic(null);
    setPrimaryColor(user.primaryColor);
    setAccentColor(user.accentColor);
    setAboutMe(user.aboutMe);
    dispatch(userSettingDetectionActions.resetAllDetection());
  };

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
          setPreviewPic={setPreviewPic}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
          avatarInputFileRef={avatarInputFileRef}
        />
        <UserSettingRightContent
          previewPic={previewPic}
          primaryColor={primaryColor}
          accentColor={accentColor}
          aboutMe={aboutMe}
          setAboutMe={setAboutMe}
        />
      </div>
      {isNeedUpdate && (
        <div className={styles.notificationContainer}>
          <div className={styles.notificationDesc}>
            <p>Careful - you have unsaved changes!</p>
          </div>
          <div className={styles.updateButtonsContainer}>
            <button
              className={styles.resetButton}
              onClick={() => {
                handleResetChanges();
              }}
            >
              Reset
            </button>
            <button className={styles.updateButton}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}
