import React from "react";
import styles from "./Avatar.module.scss";

export default function Avatar(props) {
  const { user } = props;
  return (
    <div className={styles.userAvatarContainer}>
      <img
        className={styles.userAvatar}
        src={user?.avatar}
        alt={user?.username}
      />
    </div>
  );
}
