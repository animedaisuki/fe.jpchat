import React, { useContext } from "react";
import styles from "./ChatFriendView.module.scss";
import { NavLink } from "react-router-dom";
import { CurrentFriendDispatchContext } from "../../../../context/CurrentFriendInfoProvider";
import { UserContext } from "../../../../context/UserInfoProvider";
import Avatar from "../../../Avatar/Avatar";

export default function ChatFriendView(props) {
  const setCurrentFriend = useContext(CurrentFriendDispatchContext);
  const user = useContext(UserContext);
  // const { conversation } = props;
  // const friendIdArr = conversation.members.filter(
  //   (member) => member._id !== user.id
  // );
  // const friend = friendIdArr[0];
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
            setCurrentFriend(friend.user);
          }}
        >
          {/*now use avatar component*/}
          {/*<div className={styles.chatFriendAvatarContainer}>*/}
          {/*  <img*/}
          {/*    className={styles.chatFriendImg}*/}
          {/*    src={friend.avatar}*/}
          {/*    alt={friend.username}*/}
          {/*  />*/}
          {/*</div>*/}
          <Avatar friend={friend} />
          <div className={styles.chatFriendNameContainer}>
            <p>{friend.user.username}</p>
          </div>
        </button>
      </NavLink>
    </div>
  );
}
