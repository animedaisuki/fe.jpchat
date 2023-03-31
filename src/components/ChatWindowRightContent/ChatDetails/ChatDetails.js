import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatDetails.module.scss";
import { CurrentFriendContext } from "../../../context/CurrentFriendInfoProvider";
import { BsFillChatDotsFill } from "react-icons/bs";

export default function ChatDetails() {
  const { chatId } = useParams();
  const currentFriend = useContext(CurrentFriendContext);
  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentFriend.username}
          </p>
        </div>
      </div>
      <div className={styles.chatDetailsFriendInfoArea}>
        <img
          className={styles.chatDetailsFriendAvatar}
          src={currentFriend.avatar}
          alt={currentFriend.username}
        />
        <h1 className={styles.chatDetailsFriendName}>
          {" "}
          {currentFriend.username}
        </h1>
      </div>
      <div className={styles.chatDetailsChatArea}></div>
    </div>
  );
}
