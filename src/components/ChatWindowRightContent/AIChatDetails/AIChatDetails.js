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
import config from "../../../config/config";

export default function AIChatDetails() {
  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  //这是用于http请求的，暂时保留
  const [arrivalMessages, setArrivalMessages] = useState(null);
  //这是用于处理sse请求的
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [AIIsTyping, setAIIsTyping] = useState(false);
  const [messageAdded, setMessageAdded] = useState(false);
  const [text, setText] = useState("");
  const [messageQueue, setMessageQueue] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);
  const scrollRef = useRef();
  const scrollContainerRef = useRef(null);
  const eventSourceRef = useRef(null);

  const AIFriends = useSelector((state) => state.friendsOfUser.AIFriends);
  const [currentAIFriend, setCurrentAIFriend] = useState(null);

  useEffect(() => {
    eventSourceRef.current = new EventSource(
      `${config.apiAddress}/openai/chat`
    );

    if (typeof eventSource !== "undefined") {
      console.log("event source on");
    }

    eventSourceRef.current.onopen = () => {
      console.log("EventSource connection opened");
    };

    eventSourceRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      //防止速度过快导致信息丢失
      setMessageQueue((prevState) => [...prevState, message]);
      if (message.type === "end") {
        console.log("All messages received, end of stream.");
        setTimeout(() => {
          setText("");
        }, 2000);
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        setTimeout(() => {
          setAIIsTyping(false);
        }, 2000);
        setTimeout(() => {
          setMessageAdded(false);
        }, 2000);
      } else {
        if (!AIIsTyping) {
          setAIIsTyping(true);
        }
        // console.log("Received message:", message);
        if (message?.text) {
          setText((prevState) => prevState + message?.text);
        }
      }
    };
    // eventSource.onerror = (error) => {
    //   console.error("EventSource error:", error);
    // };
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [conversationId, inputValue]);

  useEffect(() => {
    if (messageQueue.length > 0) {
      const message = messageQueue[0];
      // if (message.type === "end") {
      //   console.log("All messages received, end of stream.");
      //   setTimeout(() => {
      //     setText("");
      //   }, 2000);
      //   if (eventSourceRef.current) {
      //     eventSourceRef.current.close();
      //   }
      //   setTimeout(() => {
      //     setAIIsTyping(false);
      //   }, 2000);
      //   setTimeout(() => {
      //     setMessageAdded(false);
      //   }, 2000);
      // } else {
      //   if (!AIIsTyping) {
      //     setAIIsTyping(true);
      //   }
      //   // console.log("Received message:", message);
      //   if (message?.text) {
      //     setText((prevState) => prevState + message?.text);
      //   }
      // }
      setMessageQueue((prevState) => prevState.slice(1));
      // setTimeout(() => {}, 50);
    }
  }, [AIIsTyping, messageQueue]);

  useEffect(() => {
    if (text !== "" && !messageAdded) {
      setArrivalMsg({
        conversationId,
        text,
        senderId: currentAIFriend,
      });
    }
  }, [conversationId, currentAIFriend, text, messageAdded]);

  useEffect(() => {
    if (AIIsTyping && arrivalMsg?.text !== "" && !messageAdded && arrivalMsg) {
      setMessages([...messages, arrivalMsg]);
      setMessageAdded(true);
    }
  }, [AIIsTyping, arrivalMsg, messageAdded, messages]);

  useEffect(() => {
    if (messageAdded && text) {
      const newMessages = [...messages];
      newMessages[newMessages.length - 1].text = text;
      setMessages(newMessages);
      scrollContainerRef.current.scrollTop =
        scrollContainerRef?.current?.scrollHeight;
    }
  }, [messageAdded, messages, text]);

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

  //这是用于处理http请求的，暂时保留
  // useEffect(() => {
  //   setMessages((prevState) => [...prevState, arrivalMessages]);
  // }, [arrivalMessages]);

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
      <div
        className={styles.chatDetailsInfoAndChatContainer}
        ref={scrollContainerRef}
      >
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
