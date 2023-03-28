import React from "react";
import styles from "./ChatPage.module.scss";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import ChatFriendView from "../../components/ChatFriendView/ChatFriendView";
import { v4 as uuid } from "uuid";

export default function ChatPage() {
  const friendZura = {
    id: uuid(),
    username: "ZuraHararara",
    avatar:
      "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-ayaka-small.png",
  };
  const friendTsu = {
    id: uuid(),
    username: "TsuyokuYoshiko",
    avatar:
      "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-nahida-small.png",
  };
  const friendHosoya = {
    id: uuid(),
    username: "Hosoya",
    avatar:
      "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-shogun-samll.png",
  };
  const friends = [friendZura, friendTsu, friendHosoya];
  return (
    <div className={styles.chatPageContainer}>
      <div className={styles.chatWindowContainer}>
        <div className={styles.chatWindowLeftContent}>
          <div className={styles.chatWindowLeftSideBar}>
            <div className={styles.chatWindowUserAvatarContainer}>
              <img
                className={styles.chatWindowUserAvatar}
                src="https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-venti-small.png"
                alt="user"
              />
            </div>
            <div className={styles.chatWindowActionContainer}>
              <IoSettingsSharp className={styles.chatWindowAction} size={25} />
              <RiLogoutBoxFill className={styles.chatWindowAction} size={25} />
            </div>
          </div>
          <div className={styles.chatWindowLeftFunctionBar}>
            <div className={styles.chatWindowLeftFunctionBarSearchContainer}>
              <input
                className={styles.chatWindowLeftFunctionBarSearch}
                placeholder="Find or start a conversation"
              />
            </div>
            <div className={styles.chatWindowLeftFunctionBarFriendsContainer}>
              {friends.map((friend) => (
                <ChatFriendView
                  key={friend.id}
                  id={friend.id}
                  username={friend.username}
                  avatar={friend.avatar}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.chatWindowRightContent}></div>
      </div>
    </div>
  );
}
