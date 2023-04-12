import React, { useContext } from "react";
import { CurrentFriendContext } from "../../../../context/CurrentFriendInfoProvider";
import styles from "./FriendInfo.module.scss";

export default function FriendInfo() {
  const currentFriend = useContext(CurrentFriendContext);
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
