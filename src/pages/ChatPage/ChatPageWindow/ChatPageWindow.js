import React, { useContext, useEffect } from "react";
import styles from "./ChatPageWindow.module.scss";
import ChatWindowLeftContent from "../../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { Outlet } from "react-router-dom";
import { VideoChatContext } from "../../../context/VideoChatContext";
import { IoCall } from "react-icons/io5";
import { ImCross } from "react-icons/im";

export default function ChatPageWindow() {
  const { myVideo, setStream, call, answerCall } = useContext(VideoChatContext);

  useEffect(() => {
    const requestDeviceAccess = async () => {
      if (call?.isReceivingCall) {
        try {
          const currentStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          myVideo.current.srcObject = currentStream;
          setStream(currentStream);
        } catch (error) {
          //TODO:如果用户禁止了摄像头或者麦克风权限应该怎么做
          console.log(error);
        }
      }
    };
    requestDeviceAccess();
  }, [call?.isReceivingCall, setStream]);

  const handleCallAcceptButtonClick = () => {
    answerCall();
  };

  return (
    <div className={styles.chatWindowContainer}>
      <ChatWindowLeftContent />
      {call?.isReceivingCall && (
        <div className={styles.receivingCallWindow}>
          <div className={styles.senderAvatarContainer}>
            <img
              className={styles.senderAvatar}
              src={call.sender.avatar}
              alt={call.sender.username}
            />
            <div className={styles.ring}></div>
          </div>
          <h3 className={styles.senderName}>{call.sender.username}</h3>
          <div className={styles.callButtonsContainer}>
            <button className={styles.callDeclineButton}>
              <ImCross size={25} />
            </button>
            <button
              className={styles.callAcceptButton}
              onClick={() => {
                handleCallAcceptButtonClick();
              }}
            >
              <IoCall size={25} />
            </button>
          </div>
        </div>
      )}
      {/*<div className={styles.chatWindowRightContent}></div>*/}
      <Outlet />
    </div>
  );
}
