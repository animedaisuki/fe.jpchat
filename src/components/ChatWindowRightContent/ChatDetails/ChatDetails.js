import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatDetails.module.scss";
import { BsFillChatDotsFill } from "react-icons/bs";
import FriendInfo from "./FriendInfo/FriendInfo";
import ChatMessage from "./ChatMessage/ChatMessage";
import { v4 as uuid } from "uuid";
import { getMessage, sendMessage } from "../../../api/message/message";
import { UserContext } from "../../../context/UserInfoProvider";
import { SocketContext } from "../../../context/SocketRefProvider";
import { emojify } from "react-emoji";
import { stickers, emojis } from "../../../utils/stickers";
import { IoCall } from "react-icons/io5";
import { VideoChatContext } from "../../../context/VideoChatContext";
import { useDispatch, useSelector } from "react-redux";
import { friendIsCallingActions } from "../../../store/modules/friendIsCallingSlice";

let counter = 0;

export default function ChatDetails() {
  const randomIndex = Math.floor(Math.random() * emojis.length);

  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const currentFriend = useSelector((state) => state.currentFriend);
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [currentEmoji, setCurrentEmoji] = useState(emojis[randomIndex]);
  const {
    myVideo,
    stream,
    setStream,
    setCloseStream,
    isCalling,
    setIsCalling,
    disableCallBtn,
    callUser,
  } = useContext(VideoChatContext);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessages", (data) => {
        setArrivalMessages(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (
      arrivalMessages &&
      arrivalMessages?.senderId?.id === currentFriend?.detail?._id
    ) {
      setMessages((prevState) => [...prevState, arrivalMessages]);
    }
  }, [arrivalMessages, currentFriend]);

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
        //清空输入框，在这次submit中输入框的清空不会生效
        setInputValue("");
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
          receiverId: currentFriend?.detail?._id,
          text: inputValue,
          isSticker: false,
        });
        const result = await sendMessage(messageData);
        //setMessages
        setMessages([...messages, result.data]);
      }
    }
  };

  const handleMouseEnter = () => {
    counter = (counter + 1) % emojis.length;
    setCurrentEmoji(emojis[counter]);
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
      receiverId: currentFriend?.detail?._id,
      text: unicode,
      isSticker: true,
    });
    const result = await sendMessage(messageData);
    //setMessages
    setMessages([...messages, result.data]);
  };

  const onCallButtonClick = async () => {
    try {
      setCloseStream(false);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          // myVideo.current.srcObject = currentStream;
          setIsCalling(true);
          dispatch(friendIsCallingActions.setFriendIsCalling(currentFriend));
        });
    } catch (error) {
      //TODO:如果用户禁止了摄像头或者麦克风权限应该怎么做
      console.log(error);
    }
  };

  useEffect(() => {
    //这里依赖项目不能放friendId,不然每切换一次用户就会重新打电话
    if (stream && isCalling && myVideo.current) {
      myVideo.current.srcObject = stream;
      callUser(currentFriend?.detail?._id);
      //防止打多次电话
      setIsCalling(false);
    }
  }, [stream, isCalling, currentFriend?.detail?._id, callUser, myVideo]);

  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentFriend?.detail?.username}
          </p>
        </div>
        {currentFriend?.isOnline && (
          <button
            className={`${styles.chatOverviewCallButton} ${
              disableCallBtn ? styles.disable : undefined
            }`}
            onClick={() => {
              onCallButtonClick();
            }}
            disabled={disableCallBtn}
          >
            <IoCall size={20} />
          </button>
        )}
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
            placeholder={`Message @${currentFriend?.detail?.username}`}
          />
          <button
            className={styles.toggleEmojiButton}
            onClick={() => {
              setIsVisible((prevState) => !prevState);
            }}
            onMouseEnter={handleMouseEnter}
          >
            {emojify(currentEmoji)}
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
