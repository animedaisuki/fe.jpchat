import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatDetails.module.scss";
import { CurrentFriendContext } from "../../../context/CurrentFriendInfoProvider";
import { BsFillChatDotsFill } from "react-icons/bs";
import FriendInfo from "./FriendInfo/FriendInfo";
import ChatMessage from "./ChatMessage/ChatMessage";
import { v4 as uuid } from "uuid";

export default function ChatDetails() {
  const { chatId } = useParams();
  const currentFriend = useContext(CurrentFriendContext);
  const messages = [
    {
      id: uuid(),
      sender: "21f307a2-b840-414e-9f2b-9f070979ba63",
      receiver: "me",
      text: "喜欢二次元",
    },
    {
      id: uuid(),
      sender: "me",
      receiver: "21f307a2-b840-414e-9f2b-9f070979ba63",
      text: "我也喜欢二次元",
    },
    {
      id: uuid(),
      sender: "21f307a2-b840-414e-9f2b-9f070979ba63",
      receiver: "me",
      text:
        "Hello a Hello a Hello a Hello a Hello a Hello a Hello a " +
        "Hello a Hello a Hello a Hello a Hello a Hello a " +
        "Hello a Hello a Hello a Hello a Hello a",
    },
    {
      id: uuid(),
      sender: "21f307a2-b840-414e-9f2b-9f070979ba63",
      receiver: "me",
      text: "测试测试",
    },
    {
      id: uuid(),
      sender: "me",
      receiver: "21f307a2-b840-414e-9f2b-9f070979ba63",
      text: "好欸好欸",
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      //提交内容
      console.log("提交");
    }
  };

  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentFriend.username}
          </p>
        </div>
      </div>
      <div className={styles.chatDetailsInfoAndChatContainer}>
        <FriendInfo />
        {messages.map((message) => (
          <ChatMessage message={message} />
        ))}
      </div>
      <div className={styles.sendMessageInputContainer}>
        <input
          className={styles.sendMessageInput}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
          type="text"
          placeholder={`Message @${currentFriend.username}`}
        />
      </div>
    </div>
  );
}
