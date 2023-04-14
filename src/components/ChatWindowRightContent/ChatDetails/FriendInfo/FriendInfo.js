import React from "react";
import styles from "./FriendInfo.module.scss";
import { useSelector } from "react-redux";

export default function FriendInfo() {
  const currentFriend = useSelector((state) => state.currentFriend);
  return (
    <div className={styles.chatDetailsFriendInfoArea}>
      <img
        className={styles.chatDetailsFriendAvatar}
        src={currentFriend?.detail?.avatar}
        alt={currentFriend?.detail?.username}
      />
      <h1 className={styles.chatDetailsFriendName}>
        {currentFriend?.detail?.username}
      </h1>
      <p className={styles.chatDetailsFriendDesc}>
        This is the beginning of your DM with{" "}
        <span className={styles.chatDetailsFriendDescBold}>
          {currentFriend?.detail?.username}
        </span>
      </p>
    </div>
  );
}
