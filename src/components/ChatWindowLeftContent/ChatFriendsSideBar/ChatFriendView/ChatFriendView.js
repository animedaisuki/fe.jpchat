import React, { useContext } from "react";
import styles from "./ChatFriendView.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentFriendDispatchContext } from "../../../../context/CurrentFriendInfoProvider";

export default function ChatFriendView(props) {
  const setCurrentFriend = useContext(CurrentFriendDispatchContext);
  const { friend } = props;
  return (
    <div className={styles.chatFriendOuterContainer}>
      <NavLink
        to={`/chat/${friend.id}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <button
          className={styles.chatFriendContainer}
          onClick={() => {
            setCurrentFriend(friend);
          }}
        >
          <div className={styles.chatFriendAvatarContainer}>
            <img
              className={styles.chatFriendImg}
              src={friend.avatar}
              alt={friend.username}
            />
          </div>
          <div className={styles.chatFriendNameContainer}>
            <p>{friend.username}</p>
          </div>
        </button>
      </NavLink>
    </div>
  );
}
