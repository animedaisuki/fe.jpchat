import React, { useContext } from "react";
import styles from "./ChatFriendView.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentFriendDispatchContext } from "../../../../context/CurrentFriendInfoProvider";
import { UserContext } from "../../../../context/UserInfoProvider";

export default function ChatFriendView(props) {
  const setCurrentFriend = useContext(CurrentFriendDispatchContext);
  const user = useContext(UserContext);
  const { conversation } = props;
  const friendIdArr = conversation.members.filter(
    (member) => member._id !== user.id
  );
  const friend = friendIdArr[0];

  return (
    <div className={styles.chatFriendOuterContainer}>
      <NavLink
        to={`/chat/${conversation._id}/${friend._id}`}
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
