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
import { uploadAvatar } from "../../api/upload/upload";
import { ThreeDots } from "react-loader-spinner";

export default function UserSetting() {
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const [primaryColor, setPrimaryColor] = useState(userInfo?.primaryColor);
  const [accentColor, setAccentColor] = useState(userInfo?.accentColor);
  const [aboutMe, setAboutMe] = useState(userInfo?.aboutMe);
  const [previewPic, setPreviewPic] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    let avatar;
    const token = localStorage.getItem("access_token");
    if (isAvatarChanged && avatarInputFileRef.current.value) {
      const formData = new FormData();
      formData.append("avatar", avatarInputFileRef.current.files[0]);
      const result = await uploadAvatar(token, formData);
      if (!result.error) {
        avatar = result.data.avatar;
        setUserInfo({ ...userInfo, avatar: avatar });
        //TODO:Socket
        dispatch(userSettingDetectionActions.resetAllDetection());
      } else {
        //TODO:Error Handling
      }
    }

    const data = { primaryColor, accentColor, aboutMe };
    const result = await changePreview(token, data);
    if (!result.error) {
      //这里setUserInfo会覆盖掉上面的，且因为是state,所以需要判断
      if (isAvatarChanged) {
        if (avatar) {
          setUserInfo({
            ...userInfo,
            avatar: avatar,
            primaryColor: primaryColor,
            accentColor: accentColor,
            aboutMe: aboutMe,
          });
        }
      } else {
        setUserInfo({
          ...userInfo,
          primaryColor: primaryColor,
          accentColor: accentColor,
          aboutMe: aboutMe,
        });
      }
      //TODO:Socket
      dispatch(userSettingDetectionActions.resetAllDetection());
    } else {
      //TODO:Error Handling
    }
    setIsLoading(false);
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

      <div
        className={`${styles.notificationContainer}
      ${
        isNeedUpdate
          ? styles.notificationContainerMount
          : styles.notificationContainerUnmount
      }`}
      >
        <div className={styles.notificationDesc}>
          <p>Careful - you have unsaved changes!</p>
        </div>
        <div className={styles.updateButtonsContainer}>
          <button
            className={styles.resetButton}
            onClick={() => {
              handleResetChanges();
            }}
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            className={styles.updateButton}
            onClick={() => {
              handleSaveChanges();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ThreeDots color="#eff0f2" height="12" width="18" />
            ) : (
              <div>Save Changes</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
