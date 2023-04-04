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
import { FriendsOfUserContext } from "../../../context/FriendsOfUserProvider";

export default function ChatFriendsSideBar() {
  const user = useContext(UserContext);
  const setConversations = useContext(ConversationDispatchContext);
  const friends = useContext(FriendsOfUserContext);

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getConversation(user?.id);
      setConversations(result.data);
    };
    fetchConversations();
  }, [setConversations, user]);

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
      {friends?.map((friend) => (
        <ChatFriendView key={uuid()} friend={friend} />
      ))}
    </div>
  );
}
