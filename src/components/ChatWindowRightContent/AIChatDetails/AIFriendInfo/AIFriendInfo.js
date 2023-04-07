import React from "react";
import styles from "./AIFriendInfo.module.scss";

export default function AIFriendInfo(props) {
  const { currentAIFriend } = props;
  return (
    <div className={styles.chatDetailsFriendInfoArea}>
      <img
        className={styles.chatDetailsFriendAvatar}
        src={currentAIFriend?.avatar}
        alt={currentAIFriend?.username}
      />
      <h1 className={styles.chatDetailsFriendName}>
        {currentAIFriend?.username}
      </h1>
      <p className={styles.chatDetailsFriendDesc}>
        This is the beginning of your DM with{" "}
        <span className={styles.chatDetailsFriendDescBold}>
          {currentAIFriend?.username}
        </span>
      </p>
    </div>
  );
}
