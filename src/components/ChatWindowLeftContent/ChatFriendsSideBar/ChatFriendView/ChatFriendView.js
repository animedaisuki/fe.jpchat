import React, { useContext } from "react";
import styles from "./ChatFriendView.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentFriendDispatchContext } from "../../../../context/CurrentFriendInfoProvider";
import Avatar from "../../../Avatar/Avatar";

export default function ChatFriendView(props) {
  const setCurrentFriend = useContext(CurrentFriendDispatchContext);
  const { friend } = props;

  return (
    <div className={styles.chatFriendOuterContainer}>
      <NavLink
        to={`/chat/${friend?.conversationId}/${friend?.user._id}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <button
          className={styles.chatFriendContainer}
          onClick={() => {
            setCurrentFriend({
              detail: friend?.user,
              isOnline: friend?.isOnline,
            });
          }}
        >
          <Avatar friend={friend} />
          <div className={styles.chatFriendNameContainer}>
            <p>{friend.user.username}</p>
          </div>
        </button>
      </NavLink>
    </div>
  );
}
