import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatDetails.module.scss";
import { CurrentFriendContext } from "../../../context/CurrentFriendInfoProvider";
import { BsFillChatDotsFill } from "react-icons/bs";
import FriendInfo from "./FriendInfo/FriendInfo";
import ChatMessage from "./ChatMessage/ChatMessage";
import { v4 as uuid } from "uuid";
import { getMessage } from "../../../api/message/message";

export default function ChatDetails() {
  const { conversationId } = useParams();
  const currentFriend = useContext(CurrentFriendContext);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getMessage(conversationId);
      setMessages(result.data);
    };
    fetchMessages();
  }, [conversationId]);

  const handleChatInputChange = (e) => {
    if (e.key !== "Enter") {
      setInputValue(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //提交内容
      console.log("提交");
      //清空输入框
      setInputValue("");
    }
  };

  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentFriend?.username}
          </p>
        </div>
      </div>
      <div className={styles.chatDetailsInfoAndChatContainer}>
        <FriendInfo />
        {messages?.map((message) => (
          <ChatMessage key={uuid()} message={message} />
        ))}
      </div>
      <div className={styles.sendMessageInputContainer}>
        <input
          className={styles.sendMessageInput}
          value={inputValue}
          onChange={(e) => {
            handleChatInputChange(e);
          }}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
          type="text"
          placeholder={`Message @${currentFriend?.username}`}
        />
      </div>
    </div>
  );
}
