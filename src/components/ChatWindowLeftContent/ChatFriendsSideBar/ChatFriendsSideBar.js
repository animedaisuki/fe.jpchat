import React, { useContext, useEffect, useState } from "react";
import styles from "./ChatFriendsSideBar.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import ChatFriendView from "./ChatFriendView/ChatFriendView";
import { UserContext } from "../../../context/UserInfoProvider";
import { getConversation } from "../../../api/conversation/conversation";
import { v4 as uuid } from "uuid";

export default function ChatFriendsSideBar() {
  const user = useContext(UserContext);
  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getConversation(user?.id);
      setConversations(result.data);
    };
    fetchConversations();
  }, [user]);

  return (
    <div className={styles.chatWindowLeftFunctionBarFriendsContainer}>
      <div className={styles.chatWindowLeftFunctionBarFriendsBtnContainer}>
        <div className={styles.chatWindowLeftFunctionBarFriendsBtn}>
          <div
            className={styles.chatWindowLeftFunctionBarFriendsBtnIconContainer}
          >
            <FaUserFriends size={30} />
          </div>
          <p className={styles.chatWindowLeftFunctionBarFriendsBtnDesc}>
            Friends
          </p>
        </div>
      </div>
      <div className={styles.chatWindowLeftFunctionBarDMSplitContainer}>
        <p className={styles.chatWindowLeftFunctionBarDMDesc}>
          DIRECT MESSAGES
        </p>
        <div className={styles.chatWindowLeftFunctionBarDMSplitIconContainer}>
          <BiPlus className={styles.chatWindowLeftFunctionBarDMSplitIcon} />
        </div>
      </div>
      {conversations?.map((conversation) => (
        <ChatFriendView key={uuid()} conversation={conversation} />
      ))}
    </div>
  );
}
