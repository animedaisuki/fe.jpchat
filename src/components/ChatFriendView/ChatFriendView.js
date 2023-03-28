import React from "react";
import styles from "./ChatFriendView.module.scss";

export default function ChatFriendView(props) {
  const { username, avatar } = props;
  return (
    <div className={styles.chatFriendContainer}>
      <div className={styles.chatFriendAvatarContainer}>
        <img className={styles.chatFriendImg} src={avatar} alt={username} />
      </div>
      <div className={styles.chatFriendNameContainer}>
        <p>{username}</p>
      </div>
    </div>
  );
}
