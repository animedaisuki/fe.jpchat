import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./UserSetting.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import UserSettingLeftContent from "./UserSettingLeftContent/UserSettingLeftContent";
import UserSettingRightContent from "./UserSettingRightContent/UserSettingRightContent";
import {
  UserContext,
  UserDispatchContext,
} from "../../context/UserInfoProvider";
import { useDispatch, useSelector } from "react-redux";
import { userSettingDetectionActions } from "../../store/modules/userSettingDetectionSlice";
import { changePreview } from "../../api/user/user";

export default function UserSetting() {
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const [primaryColor, setPrimaryColor] = useState(userInfo?.primaryColor);
  const [accentColor, setAccentColor] = useState(userInfo?.accentColor);
  const [aboutMe, setAboutMe] = useState(userInfo?.aboutMe);
  const [previewPic, setPreviewPic] = useState(null);

  const avatarInputFileRef = useRef();

  const isNeedUpdate = useSelector(
    (state) => state.userSettingDetection.isNeedUpdate
  );
  const isAvatarChanged = useSelector(
    (state) => state.userSettingDetection.avatarChanged
  );
  // const isPrimaryColorChanged = useSelector(
  //   (state) => state.userSettingDetection.primaryColorChanged
  // );
  // const isAccentColorChanged = useSelector(
  //   (state) => state.userSettingDetection.accentColorChanged
  // );
  // const isAboutMeChanged = useSelector(
  //   (state) => state.userSettingDetection.aboutMeChanged
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    setPrimaryColor(userInfo?.primaryColor);
    setAccentColor(userInfo?.accentColor);
    setAboutMe(userInfo?.aboutMe);
  }, [userInfo]);

  const handleResetChanges = () => {
    avatarInputFileRef.current.value = null;
    setPreviewPic(null);
    setPrimaryColor(userInfo.primaryColor);
    setAccentColor(userInfo.accentColor);
    setAboutMe(userInfo.aboutMe);
    dispatch(userSettingDetectionActions.resetAllDetection());
  };

  const handleSaveChanges = async () => {
    if (isAvatarChanged) {
      //TODO:Handle avatar change
    }
    const token = localStorage.getItem("access_token");
    const data = { primaryColor, accentColor, aboutMe };
    const result = await changePreview(token, data);
    if (!result.error) {
      setUserInfo({
        ...userInfo,
        primaryColor: primaryColor,
        accentColor: accentColor,
        aboutMe: aboutMe,
      });
      //TODO:Socket
      dispatch(userSettingDetectionActions.resetAllDetection());
    } else {
      //TODO:Error Handling
    }
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
            <button
              className={styles.updateButton}
              onClick={() => {
                handleSaveChanges();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
