import React from "react";
import styles from "./AIChatMessage.module.scss";

export default function AIChatMessage(props) {
  const { message } = props;

  return (
    <div className={styles.chatDetailsChatArea}>
      <div className={styles.chatDetailsChatAreaAvatarContainer}>
        {/*之后可以通过senderId找到对应的avatar*/}
        <img
          className={styles.chatDetailsChatAreaAvatar}
          src={message?.senderId?.avatar}
          alt={message?.senderId?.username}
        />
      </div>
      <div className={styles.chatDetailsChatAreaDateAndBoxContainer}>
        <div>
          <p>
            <span className={styles.chatDetailsChatAreaChatBoxUsername}>
              {message?.senderId?.username}
            </span>
            {"  "}
            01-03-2023
          </p>
        </div>
        <div className={styles.chatDetailsChatAreaChatBox}>{message?.text}</div>
      </div>
    </div>
  );
}
