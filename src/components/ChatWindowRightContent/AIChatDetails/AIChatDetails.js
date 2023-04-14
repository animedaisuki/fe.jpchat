import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AIChatDetails.module.scss";
import { BsFillChatDotsFill } from "react-icons/bs";
import AIFriendInfo from "./AIFriendInfo/AIFriendInfo";
import AIChatMessage from "./AIChatMessage/AIChatMessage";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../../context/UserInfoProvider";
import { stickers } from "../../../utils/stickers";
import { FaTelegramPlane } from "react-icons/fa";
import { sendMessageToAI } from "../../../api/chatGpt/chatGpt";
import { fetchAIMessagesByConversationId } from "../../../api/chatGpt/chatGpt";
import { useSelector } from "react-redux";

export default function AIChatDetails() {
  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const scrollRef = useRef();

  const AIFriends = useSelector((state) => state.friendsOfUser.AIFriends);
  const [currentAIFriend, setCurrentAIFriend] = useState(null);

  useEffect(() => {
    setCurrentAIFriend(AIFriends[0]?.user);
  }, [AIFriends]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("access_token");
      const result = await fetchAIMessagesByConversationId(
        token,
        conversationId
      );
      setMessages(result?.data);
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatInputChange = (e) => {
    if (e.key !== "Enter") {
      setInputValue(e.target.value);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      //如果输入框不为空
      if (e.target.value.trim() !== "") {
        setIsDisabled(true);
        setInputValue("");
        //提交内容
        const messageData = {
          senderId: user,
          senderDetail: user,
          conversationId: conversationId,
          text: inputValue,
        };
        setMessages([...messages, messageData]);
        const token = localStorage.getItem("access_token");
        const result = await sendMessageToAI(token, messageData);
        if (!result.error) {
          setArrivalMessages(result.data);
        }
        setIsDisabled(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setIsDisabled(true);
      setInputValue("");
      const messageData = {
        senderId: user,
        senderDetail: user,
        conversationId: conversationId,
        text: inputValue,
      };
      setMessages([...messages, messageData]);
      const token = localStorage.getItem("access_token");
      const result = await sendMessageToAI(token, messageData);
      if (!result.error) {
        setArrivalMessages(result.data);
      }
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    setMessages((prevState) => [...prevState, arrivalMessages]);
  }, [arrivalMessages]);

  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentAIFriend?.username}
          </p>
        </div>
      </div>
      <div className={styles.chatDetailsInfoAndChatContainer}>
        <AIFriendInfo currentAIFriend={currentAIFriend} />
        {messages?.map((message) => (
          <div key={uuid()} ref={scrollRef}>
            <AIChatMessage message={message} stickers={stickers} />
          </div>
        ))}
      </div>
      <div className={styles.sendMessageInputContainer}>
        <div className={styles.sendMessageInputInnerContainer}>
          <input
            className={styles.sendMessageInput}
            value={inputValue}
            onChange={(e) => {
              handleChatInputChange(e);
            }}
            onKeyPress={(e) => {
              handleKeyPress(e);
            }}
            disabled={isDisabled}
            type="text"
            placeholder={`Message @${currentAIFriend?.username}`}
          />

          <button
            className={`${styles.sendMessageButton} ${
              isDisabled ? styles.disabled : undefined
            }`}
            onClick={handleSendMessage}
            disabled={isDisabled}
          >
            <div className={styles.sendMessageIconContainer}>
              <FaTelegramPlane size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
