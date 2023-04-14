import React from "react";
import styles from "./ChatFriendView.module.scss";
import { NavLink } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";
import { useDispatch } from "react-redux";
import { currentFriendActions } from "../../../../store/modules/currentFriendSlice";

export default function ChatFriendView(props) {
  const dispatch = useDispatch();

  const { friend } = props;
  const currentFriend = {
    detail: friend?.user,
    isOnline: friend?.isOnline,
  };

  const handleConversationButtonClick = () => {
    dispatch(currentFriendActions.setCurrentFriend(currentFriend));
  };

  return (
    <div className={styles.chatFriendOuterContainer}>
      <NavLink
        to={`/chat/${friend?.conversationId}/${friend?.user._id}`}
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        <button
          className={styles.chatFriendContainer}
          onClick={() => {
            handleConversationButtonClick();
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
