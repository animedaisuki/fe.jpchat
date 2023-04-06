import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatDetails.module.scss";
import { CurrentFriendContext } from "../../../context/CurrentFriendInfoProvider";
import { BsFillChatDotsFill } from "react-icons/bs";
import FriendInfo from "./FriendInfo/FriendInfo";
import ChatMessage from "./ChatMessage/ChatMessage";
import { v4 as uuid } from "uuid";
import { getMessage, sendMessage } from "../../../api/message/message";
import { UserContext } from "../../../context/UserInfoProvider";
import { SocketContext } from "../../../context/SocketRefProvider";
import { emojify } from "react-emoji";
import { stickers } from "../../../utils/stickers";

export default function ChatDetails() {
  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const currentFriend = useContext(CurrentFriendContext);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }
    return () => {
      clearTimeout();
    };
  }, [isVisible]);

  const toggleEmoji = ":smile:";

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessages", (data) => {
        setArrivalMessages(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessages) {
      console.log(arrivalMessages);
      setMessages((prevState) => [...prevState, arrivalMessages]);
    }
  }, [arrivalMessages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getMessage(conversationId);
      setMessages(result.data);
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
        //提交内容
        const messageData = {
          senderId: user.id,
          senderDetail: user,
          conversation: conversationId,
          text: inputValue,
          isSticker: false,
        };
        //socket event
        socket.current.emit("sendMessage", {
          senderId: user,
          receiverId: currentFriend._id,
          text: inputValue,
          isSticker: false,
        });
        const result = await sendMessage(messageData);
        //setMessages
        setMessages([...messages, result.data]);
        //清空输入框
        setInputValue("");
      }
    }
  };

  const handleSendSticker = async (unicode) => {
    setIsVisible(false);
    const messageData = {
      senderId: user.id,
      senderDetail: user,
      conversation: conversationId,
      text: unicode,
      isSticker: true,
    };
    //socket event
    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId: currentFriend._id,
      text: unicode,
      isSticker: true,
    });
    const result = await sendMessage(messageData);
    //setMessages
    setMessages([...messages, result.data]);
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
          <div key={uuid()} ref={scrollRef}>
            <ChatMessage message={message} stickers={stickers} />
          </div>
        ))}
      </div>
      <div className={styles.sendMessageInputContainer}>
        {/*<div>*/}
        {/*  {emojis.map((emoji, index) => (*/}
        {/*    <button*/}
        {/*      key={index}*/}
        {/*      onClick={() => {}}*/}
        {/*      style={{ margin: "5px", cursor: "pointer" }}*/}
        {/*    >*/}
        {/*      {emojify(emoji)}*/}
        {/*    </button>*/}
        {/*  ))}*/}
        {/*</div>*/}
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
            type="text"
            placeholder={`Message @${currentFriend?.username}`}
          />
          <button
            className={styles.toggleEmojiButton}
            onClick={() => {
              setIsVisible((prevState) => !prevState);
            }}
          >
            {emojify(toggleEmoji)}
          </button>
          {isAnimating && (
            <div className={styles.stickerSelectionWindow}>
              <div className={styles.stickerSelectionWindowHeading}>
                Stickers
              </div>
              <div
                className={`${styles.stickerSelectionWindowMainContainer} ${
                  isVisible ? undefined : styles.hidden
                }`}
              >
                {stickers.map((sticker) => (
                  <div
                    className={styles.stickerSelectionWindowMain}
                    key={uuid()}
                  >
                    <button
                      className={styles.stickerSelectionWindowButton}
                      onClick={() => {
                        handleSendSticker(sticker.unicode);
                      }}
                    >
                      <img
                        className={styles.stickerSelectionWindowImg}
                        src={sticker.png}
                        alt={sticker.unicode}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
