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

export default function ChatDetails() {
  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const currentFriend = useContext(CurrentFriendContext);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const scrollRef = useRef();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessages", (data) => {
        setArrivalMessages(data);
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessages) {
      setMessages((prevState) => [...prevState, arrivalMessages]);
    }
  }, [arrivalMessages]);

  // useEffect(() => {
  //   if (user) {
  //     socket.current?.emit("addUser", user?.id);
  //     socket.current?.on("getUsers", (users) => {
  //       //拿到在线用户
  //       // console.log(users);
  //     });
  //   }
  // }, [user]);

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
        };
        //socket event
        socket.current.emit("sendMessage", {
          senderId: user,
          receiverId: currentFriend._id,
          text: inputValue,
        });
        const result = await sendMessage(messageData);
        //setMessages
        setMessages([...messages, result.data]);
        //清空输入框
        setInputValue("");
      }
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
          <div key={uuid()} ref={scrollRef}>
            <ChatMessage message={message} />
          </div>
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
