import React, { useContext } from "react";
import styles from "./UserSettingLeftContent.module.scss";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { userSettingDetectionActions } from "../../../store/modules/userSettingDetectionSlice";
import { UserContext } from "../../../context/UserInfoProvider";

export default function UserSettingLeftContent(props) {
  const {
    primaryColor,
    setPrimaryColor,
    accentColor,
    setAccentColor,
    setAboutMe,
  } = props;

  const user = useContext(UserContext);

  const dispatch = useDispatch();

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
        <button className={styles.avatarChangeButton}>Change Avatar</button>
      </div>
      <div className={styles.bannerChangeContainer}>
        <h6>BANNER COLOUR</h6>
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
          />
        </div>
      </div>
    </div>
  );
}
