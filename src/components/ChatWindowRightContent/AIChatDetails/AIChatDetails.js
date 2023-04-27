import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./AIChatDetails.module.scss";
import { BsFillChatDotsFill } from "react-icons/bs";
import AIFriendInfo from "./AIFriendInfo/AIFriendInfo";
import AIChatMessage from "./AIChatMessage/AIChatMessage";
import { v4 as uuid } from "uuid";
import {
  UserContext,
  UserDispatchContext,
} from "../../../context/UserInfoProvider";
import { stickers } from "../../../utils/stickers";
import { FaMicrophone } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { sendMessageToAI } from "../../../api/chatGpt/chatGpt";
import { fetchAIMessagesByConversationId } from "../../../api/chatGpt/chatGpt";
import { useSelector } from "react-redux";
import { changeVoicePreference } from "../../../api/user/user";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { ScaleLoader } from "react-spinners";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import WindowError from "../../WindowError/WindowError";

export default function AIChatDetails() {
  const { conversationId } = useParams();
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatchContext);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [AIIsThinking, setAIIsThinking] = useState(false);
  const [voice, setVoice] = useState(null);
  const [isChangingVoice, setIsChangingVoice] = useState(false);
  const [isStartTalking, setIsStartTalking] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const scrollRef = useRef();

  const AIFriends = useSelector((state) => state.friendsOfUser.AIFriends);
  const [currentAIFriend, setCurrentAIFriend] = useState(null);

  const AIAutoSpeakRef = useRef();

  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSpeaking = async () => {
    if (browserSupportsSpeechRecognition && isMicrophoneAvailable) {
      if (user.voicePreference === "CN") {
        SpeechRecognition.startListening({
          language: "zh-CN",
          continuous: false,
        });
      } else {
        SpeechRecognition.startListening({
          language: "ja-JP",
          continuous: false,
        });
      }
    } else {
      setErrorMessage(
        "Please check your browser and allow us accessing your microphone"
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!listening && isStartTalking) {
      const fetchAnswerFromAI = async () => {
        resetTranscript();
        setIsStartTalking(false);
        setAIIsThinking(true);
        const token = localStorage.getItem("access_token");
        const result = await sendMessageToAI(
          token,
          messages[messages.length - 1]
        );
        if (!result.error) {
          setArrivalMessages(result.data);
        } else {
          setErrorMessage("Please check your network");
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        }

        setAIIsThinking(false);
      };
      fetchAnswerFromAI();
    }
  }, [listening, isStartTalking, resetTranscript, messages]);

  useEffect(() => {
    if (!isStartTalking) {
      if (transcript) {
        const messageData = {
          senderId: user,
          senderDetail: user,
          conversationId: conversationId,
          text: transcript,
        };
        setMessages([...messages, messageData]);
        setIsStartTalking(true);
      }
    }
  }, [isStartTalking, transcript, listening, user, conversationId]);

  useEffect(() => {
    if (transcript && isStartTalking) {
      setMessages((prevState) => {
        const updatedMessages = [...prevState];
        updatedMessages[prevState.length - 1] = {
          ...updatedMessages[prevState.length - 1],
          text: transcript,
        };
        return updatedMessages;
      });
    }
  }, [transcript, isStartTalking]);

  useEffect(() => {
    setCurrentAIFriend(AIFriends[0]?.user);
  }, [AIFriends]);

  useEffect(() => {
    setVoice(user?.voicePreference);
  }, [user]);

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
        setAIIsThinking(true);
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
        setAIIsThinking(false);
      }
    }
  };

  // const handleSendMessage = async () => {
  //   if (inputValue.trim() !== "") {
  //     setAIIsThinking(true);
  //     setInputValue("");
  //     const messageData = {
  //       senderId: user,
  //       senderDetail: user,
  //       conversationId: conversationId,
  //       text: inputValue,
  //     };
  //     setMessages([...messages, messageData]);
  //     const token = localStorage.getItem("access_token");
  //     const result = await sendMessageToAI(token, messageData);
  //     if (!result.error) {
  //       setArrivalMessages(result.data);
  //     }
  //     setAIIsThinking(false);
  //   }
  // };

  useEffect(() => {
    setMessages((prevState) => [...prevState, arrivalMessages]);
    if (arrivalMessages?.audioData) {
      const arrayBuffer = new Uint8Array(arrivalMessages.audioData.data).buffer;
      const audioBlob = new Blob([arrayBuffer], {
        type: "audio/wav",
      });
      const audioUrl = URL.createObjectURL(audioBlob);

      AIAutoSpeakRef.current.src = audioUrl;
      AIAutoSpeakRef.current.playbackRate = 1.2;
      AIAutoSpeakRef.current.play();
    }
  }, [arrivalMessages]);

  const toggleVoicePreference = async () => {
    setIsChangingVoice(true);
    try {
      const result = await changeVoicePreference({ userId: user.id });
      const updatedUserInfo = result.data;
      setVoice(updatedUserInfo.voicePreference);
      setUser({ ...user, voicePreference: updatedUserInfo.voicePreference });
    } catch (error) {
      //TODO:Show error Window if error occurs
      console.log(error);
    }
    setIsChangingVoice(false);
  };

  return (
    <div className={styles.chatDetailsContainer}>
      <div className={styles.chatDetailsHeading}>
        <div className={styles.chatOverviewContainer}>
          <BsFillChatDotsFill size={20} />
          <p className={styles.chatOverviewUsername}>
            {currentAIFriend?.username}
          </p>
        </div>
        {isChangingVoice ? (
          <div className={styles.voicePreferenceButton}>
            <RotatingLines strokeColor="#eff0f2" height="20" width="20" />
          </div>
        ) : (
          <button
            className={styles.voicePreferenceButton}
            onClick={() => {
              toggleVoicePreference();
            }}
          >
            <AiFillSound size={20} />
            <p className={styles.voicePreference}>{voice}</p>
          </button>
        )}
      </div>
      <audio className={styles.audio} ref={AIAutoSpeakRef} controls />
      <div className={styles.chatDetailsInfoAndChatContainer}>
        {errorMessage && (
          <div className={styles.errorMessageContainer}>
            <WindowError errorMessage={errorMessage} />
          </div>
        )}
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
            disabled={AIIsThinking}
            type="text"
            placeholder={
              AIIsThinking ? "" : `Message @${currentAIFriend?.username}`
            }
          />
          {AIIsThinking && (
            <div className={styles.aiIsThinkingContainer}>
              <p>Chtholly is Thinking</p>
              <div className={styles.aiIsThinkingAnimationContainer}>
                <ThreeDots color="#9fa3a9" height="16" width="16" />
              </div>
            </div>
          )}
          {listening ? (
            <div className={styles.speakingStatusIconContainer}>
              <ScaleLoader height="20px" width="2px" color="#7e8287" />
            </div>
          ) : (
            <button
              className={`${styles.sendMessageButton} ${
                AIIsThinking ? styles.disabled : undefined
              }`}
              onClick={handleSpeaking}
              disabled={AIIsThinking}
            >
              <div className={styles.sendMessageIconContainer}>
                <FaMicrophone size={20} />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
