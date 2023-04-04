import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatWindowLeftContent.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import ChatFriendsSideBar from "./ChatFriendsSideBar/ChatFriendsSideBar";
import { UserContext } from "../../context/UserInfoProvider";
import { io } from "socket.io-client";
import config from "../../config/config";
import { SocketContext } from "../../context/SocketRefProvider";
import { ConversationContext } from "../../context/ConversationProvider";
import { FriendsOfUserDispatchContext } from "../../context/FriendsOfUserProvider";

export default function ChatWindowLeftContent() {
  const userInfo = useContext(UserContext);
  const socket = useContext(SocketContext);
  const conversations = useContext(ConversationContext);
  const setFriends = useContext(FriendsOfUserDispatchContext);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !token) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    let friends = [];
    conversations?.forEach((conversation) => {
      const friend = conversation?.members.find(
        (member) => member._id !== userInfo?.id
      );
      friends.push({ user: friend, conversationId: conversation._id });
      setFriends(friends);
    });
  }, [userInfo, conversations]);

  //set friend issue, need to log out after every refresh
  // useEffect(() => {
  //   const onBeforeUnload = () => {
  //     localStorage.clear();
  //   };
  //   window.addEventListener("beforeunload", onBeforeUnload);
  //
  //   return () => {
  //     window.removeEventListener("beforeunload", onBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    if (!socket.current && userInfo) {
      socket.current = io(config.socketServerAddress);
    }
    // console.log(socket.current);

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      socket.current?.emit("addUser", userInfo?.id);
      socket.current?.on("getUsers", (users) => {
        //拿到在线用户
        // console.log(users);
      });
    }
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
          <RiLogoutBoxFill
            className={styles.chatWindowAction}
            size={25}
            onClick={handleLogout}
          />
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
