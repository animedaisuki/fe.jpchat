import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ActiveFriendsList.module.scss";
import Avatar from "../../../../Avatar/Avatar";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { CurrentFriendDispatchContext } from "../../../../../context/CurrentFriendInfoProvider";

export default function ActiveFriendsList(props) {
  const setCurrentFriend = useContext(CurrentFriendDispatchContext);
  const { friend } = props;

  return (
    <div className={styles.activeFriendListContainer}>
      <div className={styles.activeFriendListHoverContainer}>
        <div className={styles.activeFriendListAvatarNameGroup}>
          <Avatar friend={friend} />
          <p className={styles.activeFriendListUsername}>
            {friend?.user.username}
          </p>
        </div>
        <NavLink to={`/chat/${friend?.conversationId}/${friend?.user._id}`}>
          <button
            className={styles.activeFriendListChatNavButton}
            onClick={() => {
              setCurrentFriend({
                detail: friend?.user,
                isOnline: friend?.isOnline,
              });
            }}
          >
            <div className={styles.activeFriendListChatNavButtonIconContainer}>
              <HiChatBubbleLeft size={23} />
            </div>
          </button>
        </NavLink>
      </div>
    </div>
  );
}
