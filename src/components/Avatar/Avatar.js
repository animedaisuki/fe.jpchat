import React from "react";
import styles from "./Avatar.module.scss";

export default function Avatar(props) {
  const { friend } = props;

  return (
    <div className={styles.userAvatarContainer}>
      <img
        className={styles.userAvatar}
        src={friend?.user.avatar}
        alt={friend?.user.username}
      />
      <div className={styles.onlineStatusCircleOuter}>
        <div
          className={`${styles.onlineStatusCircleMid} ${
            friend?.isOnline ? styles.online : undefined
          }`}
        >
          <div className={styles.onlineStatusCircleInner}>{""}</div>
        </div>
      </div>
    </div>
  );
}
