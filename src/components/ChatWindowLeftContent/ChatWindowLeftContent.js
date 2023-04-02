import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatWindowLeftContent.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import ChatFriendsSideBar from "./ChatFriendsSideBar/ChatFriendsSideBar";
import { UserContext } from "../../context/UserInfoProvider";

export default function ChatWindowLeftContent() {
  const userInfo = useContext(UserContext);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !token) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div className={styles.chatWindowLeftContent}>
      <div className={styles.chatWindowLeftSideBar}>
        <div className={styles.chatWindowUserAvatarContainer}>
          <img
            className={styles.chatWindowUserAvatar}
            src={userInfo?.avatar}
            alt={userInfo?.username}
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
        <ChatFriendsSideBar />
      </div>
    </div>
  );
}
