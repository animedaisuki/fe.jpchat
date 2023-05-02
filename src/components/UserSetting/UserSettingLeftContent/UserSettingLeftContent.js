import React, { useContext } from "react";
import styles from "./UserSettingLeftContent.module.scss";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { userSettingDetectionActions } from "../../../store/modules/userSettingDetectionSlice";
import { UserContext } from "../../../context/UserInfoProvider";

export default function UserSettingLeftContent(props) {
  const {
    setPreviewPic,
    primaryColor,
    setPrimaryColor,
    accentColor,
    setAccentColor,
    aboutMe,
    setAboutMe,
    avatarInputFileRef,
  } = props;

  const user = useContext(UserContext);

  const dispatch = useDispatch();

  const handleAvatarInputClick = () => {
    avatarInputFileRef?.current?.click();
  };

  const handleAvatarChange = (e) => {
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    if (e.target.files && e.target.files[0]) {
      if (allowedMimeTypes.includes(e.target.files[0].type)) {
        setPreviewPic(URL.createObjectURL(e.target.files[0]));
        dispatch(userSettingDetectionActions.detectAvatarChange());
      }
    }
  };

  const handlePrimaryColorChange = (e) => {
    setPrimaryColor(e.target.value);
    dispatch(userSettingDetectionActions.detectPrimaryColorChange());
  };

  const handleAccentColorChange = (e) => {
    setAccentColor(e.target.value);
    dispatch(userSettingDetectionActions.detectAccentColorChange());
  };

  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
    if (user) {
      dispatch(userSettingDetectionActions.detectAboutMeChange());
      if (e.target.value === user.aboutMe) {
        dispatch(userSettingDetectionActions.resetAboutMeDetection());
      }
    }
  };

  return (
    <div className={styles.userSettingLeftContainer}>
      <div className={styles.avatarChangeContainer}>
        <h6>AVATAR</h6>
        <button
          className={styles.avatarChangeButton}
          onClick={() => {
            handleAvatarInputClick();
          }}
        >
          Change Avatar
        </button>
        <input
          style={{ display: "none" }}
          type="file"
          name="avatar"
          ref={avatarInputFileRef}
          onChange={(e) => {
            handleAvatarChange(e);
          }}
          accept="image/png, image/jpeg, image/gif, image/jpg, image/webp"
        />
      </div>
      <div className={styles.bannerChangeContainer}>
        <h6>PROFILE THEME</h6>
        <div className={styles.bannerColorInputOuterContainer}>
          <div className={styles.bannerColorInputContainer}>
            <input
              className={styles.bannerColorInput}
              type="color"
              value={primaryColor}
              onChange={(e) => {
                handlePrimaryColorChange(e);
              }}
            />
            <div className={styles.editIconContainer}>
              <MdEdit size={15} />
            </div>
            <p className={styles.bannerColorDesc}>Primary</p>
          </div>
          <div className={styles.bannerColorInputContainer}>
            <input
              className={styles.bannerColorInput}
              type="color"
              value={accentColor}
              onChange={(e) => {
                handleAccentColorChange(e);
              }}
            />
            <div className={styles.editIconContainer}>
              <MdEdit size={15} />
            </div>
            <p className={styles.bannerColorDesc}>Accent</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutMeContainer}>
        <h6>ABOUT ME</h6>
        <div className={styles.aboutMeInputContainer}>
          <textarea
            maxLength="50"
            className={styles.aboutMeInput}
            onChange={(e) => {
              handleAboutMeChange(e);
            }}
            value={aboutMe}
          />
        </div>
      </div>
    </div>
  );
}
