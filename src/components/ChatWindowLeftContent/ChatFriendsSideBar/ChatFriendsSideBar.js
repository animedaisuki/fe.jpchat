import React, { useContext, useEffect } from "react";
import styles from "./ChatFriendsSideBar.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import ChatFriendView from "./ChatFriendView/ChatFriendView";
import { UserContext } from "../../../context/UserInfoProvider";
import { getConversation } from "../../../api/conversation/conversation";
import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import { ConversationDispatchContext } from "../../../context/ConversationProvider";
import { ChatGptConversationDispatchContext } from "../../../context/ChatGptConversationProvider";
import { fetchAIConversation } from "../../../api/chatGpt/chatGpt";
import { AIFriendOfUserContext } from "../../../context/AIFriendOfUserProvider";
import ChatAIFriendView from "./ChatAIFriendView/ChatAIFriendView";
import { useSelector } from "react-redux";

export default function ChatFriendsSideBar() {
  const user = useContext(UserContext);
  const setConversations = useContext(ConversationDispatchContext);
  const setChatGptConversation = useContext(ChatGptConversationDispatchContext);
  const friends = useSelector((state) => state.friendsOfUser);
  const AIFriends = useContext(AIFriendOfUserContext);

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getConversation(user?.id);
      setConversations(result.data);
    };
    fetchConversations();
  }, [setConversations, user]);

  useEffect(() => {
    const fetchConversationForChatGpt = async () => {
      const token = localStorage.getItem("access_token");
      const result = await fetchAIConversation(token, user?.id);
      if (result.data) {
        setChatGptConversation(result.data);
      }
    };
    fetchConversationForChatGpt();
  }, [setChatGptConversation, user]);

  return (
    <div className={styles.chatWindowLeftFunctionBarFriendsContainer}>
      <div className={styles.chatWindowLeftFunctionBarFriendsBtnContainer}>
        <NavLink
          to={`/chat/friends`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <button className={styles.chatWindowLeftFunctionBarFriendsBtn}>
            <div
              className={
                styles.chatWindowLeftFunctionBarFriendsBtnIconContainer
              }
            >
              <FaUserFriends size={30} />
            </div>
            <p className={styles.chatWindowLeftFunctionBarFriendsBtnDesc}>
              Friends
            </p>
          </button>
        </NavLink>
      </div>
      <div className={styles.chatWindowLeftFunctionBarDMSplitContainer}>
        <p className={styles.chatWindowLeftFunctionBarDMDesc}>
          DIRECT MESSAGES
        </p>
        <div className={styles.chatWindowLeftFunctionBarDMSplitIconContainer}>
          <BiPlus className={styles.chatWindowLeftFunctionBarDMSplitIcon} />
        </div>
      </div>
      {AIFriends?.map((AIFriend) => (
        <ChatAIFriendView key={uuid()} friend={AIFriend} />
      ))}
      {friends?.map((friend) => (
        <ChatFriendView key={uuid()} friend={friend} />
      ))}
    </div>
  );
}
