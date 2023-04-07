import React from "react";
import styles from "./ChatAIFriendView.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";

export default function ChatAIFriendView(props) {
  const { friend } = props;

  return (
    <div className={styles.chatFriendOuterContainer}>
      <NavLink
        to={`/chat/chtholly/${friend?.conversationId}/${friend?.user._id}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <button className={styles.chatFriendContainer}>
          <Avatar friend={friend} />
          <div className={styles.chatFriendNameContainer}>
            <p>{friend.user.username}</p>
          </div>
        </button>
      </NavLink>
    </div>
  );
}
