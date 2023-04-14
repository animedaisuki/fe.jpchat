import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatWindowLeftContent.module.scss";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import ChatFriendsSideBar from "./ChatFriendsSideBar/ChatFriendsSideBar";
import {
  UserContext,
  UserDispatchContext,
} from "../../context/UserInfoProvider";
import { io } from "socket.io-client";
import config from "../../config/config";
import { SocketContext } from "../../context/SocketRefProvider";
import {
  ConversationContext,
  ConversationDispatchContext,
} from "../../context/ConversationProvider";
import { ChatGptConversationContext } from "../../context/ChatGptConversationProvider";
import { AIFriendOfUserDispatchContext } from "../../context/AIFriendOfUserProvider";
import { VideoChatContext } from "../../context/VideoChatContext";
import { useDispatch, useSelector } from "react-redux";
import { friendsOfUserActions } from "../../store/modules/friendsOfUserSlice";

export default function ChatWindowLeftContent() {
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const socket = useContext(SocketContext);
  const conversations = useContext(ConversationContext);
  const chatGptConversation = useContext(ChatGptConversationContext);
  const setConversations = useContext(ConversationDispatchContext);
  const friends = useSelector((state) => state.friendsOfUser);
  const setAIFriend = useContext(AIFriendOfUserDispatchContext);
  const { logout } = useContext(VideoChatContext);

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [onlineUsers, setOnlineUsers] = useState(null);

  const [arrivalConversation, setArrivalConversation] = useState(null);

  useEffect(() => {
    if (!userInfo || !token) {
      navigate("/login");
    }
  }, [navigate, token, userInfo]);

  useEffect(() => {
    let friendsArr = [];
    //TODO:OPTIMIZE THIS CODE
    conversations?.forEach((conversation) => {
      const friend = conversation?.members.find(
        (member) => member._id !== userInfo?.id
      );
      friendsArr.push({
        user: friend,
        conversationId: conversation._id,
        isOnline: false,
      });
    });
    dispatch(friendsOfUserActions.setFriendsOfUser(friendsArr));
  }, [userInfo, conversations, dispatch]);

  useEffect(() => {
    let AIFriendsArr = [];
    //TODO:OPTIMIZE THIS CODE
    chatGptConversation?.forEach((conversation) => {
      const friend = conversation?.members.find(
        (member) => member._id !== userInfo?.id
      );
      AIFriendsArr.push({
        user: friend,
        conversationId: conversation._id,
        isOnline: true,
      });
      setAIFriend(AIFriendsArr);
    });
  }, [userInfo, chatGptConversation, setAIFriend]);

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
  }, [socket, userInfo]);

  useEffect(() => {
    if (userInfo) {
      socket.current?.emit("addUser", userInfo?.id);
      socket.current?.on("getUsers", (users) => {
        //拿到在线用户
        setOnlineUsers(users);
      });
    }
  }, [socket, userInfo]);

  useEffect(() => {
    if (socket.current) {
      socket.current?.on("getArrivalConversation", (data) => {
        const { newConversation } = data;
        setArrivalConversation(newConversation);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalConversation) {
      setConversations((prevState) => [...prevState, arrivalConversation]);
    }
  }, [arrivalConversation]);

  useEffect(() => {
    // console.log(onlineUsers);
    // 之前的问题出在直接去更改state
    // 现在是没有在friends状态改变后重新执行
    // TODO:OPTIMIZE THIS CODE
    if (friends && onlineUsers) {
      const updatedFriends = friends?.map((friend) => {
        const isOnline = !!onlineUsers[friend.user._id];
        if (isOnline) {
          // console.log("a friend connected");
        }
        return { ...friend, isOnline };
      });
      // 防止无限循环
      if (JSON.stringify(updatedFriends) !== JSON.stringify(friends)) {
        dispatch(friendsOfUserActions.setFriendsOfUser(updatedFriends));
      }
    }
  }, [friends, onlineUsers, dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    socket.current?.disconnect();
    setUserInfo(null);
    logout();
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
