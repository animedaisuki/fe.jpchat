import React from "react";
import styles from "./ChatPage.module.scss";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";

export default function ChatPage() {
  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatWindowContainer}>
        <div className={styles.chatWindowLeftContent}>
          <div className={styles.chatWindowLeftSideBar}>
            <div className={styles.chatWindowUserAvatarContainer}>
              <img
                className={styles.chatWindowUserAvatar}
                src="https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/poke.JPG"
                alt="user"
              />
            </div>
            <div className={styles.chatWindowActionContainer}>
              <IoSettingsSharp className={styles.chatWindowAction} size={25} />
              <RiLogoutBoxFill className={styles.chatWindowAction} size={25} />
            </div>
          </div>
        </div>
        <div className={styles.chatWindowRightContent}></div>
      </div>
    </div>
  );
}
