import React, { useContext } from "react";
import { CurrentFriendContext } from "../../../../context/CurrentFriendInfoProvider";
import { UserContext } from "../../../../context/UserInfoProvider";
import styles from "./ChatMessage.module.scss";

export default function ChatMessage(props) {
  const currentFriend = useContext(CurrentFriendContext);
  const user = useContext(UserContext);
  const { message } = props;
  return (
    <div className={styles.chatDetailsChatArea}>
      <div className={styles.chatDetailsChatAreaAvatarContainer}>
        {/*之后可以通过senderId找到对应的avatar*/}
        <img
          className={styles.chatDetailsChatAreaAvatar}
          src={message?.senderId.avatar}
          alt={message?.senderId.username}
        />
      </div>
      <div className={styles.chatDetailsChatAreaDateAndBoxContainer}>
        <div>
          <p>
            <span className={styles.chatDetailsChatAreaChatBoxUsername}>
              {message?.senderId.username}
            </span>
            {"  "}
            01-03-2023
          </p>
        </div>
        <div className={styles.chatDetailsChatAreaChatBox}>{message.text}</div>
      </div>
    </div>
  );
}
