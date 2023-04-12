import React, { useContext, useEffect } from "react";
import styles from "./ChatPageWindow.module.scss";
import ChatWindowLeftContent from "../../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { Outlet } from "react-router-dom";
import { VideoChatContext } from "../../../context/VideoChatContext";
import { IoCall } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { FriendIsCallingContext } from "../../../context/FriendIsCallingProvider";
import { ImPhoneHangUp } from "react-icons/im";

export default function ChatPageWindow() {
  const {
    myVideo,
    friendVideo,
    stream,
    setStream,
    setCloseStream,
    call,
    isCalling,
    callAccepted,
    callEnded,
    showVideo,
    answerCall,
    declineCall,
    leaveCall,
  } = useContext(VideoChatContext);

  const { friendIsCalling } = useContext(FriendIsCallingContext);

  // useEffect(() => {
  //   console.log(friendIsCalling);
  // }, [friendIsCalling]);

  //收到来电时
  useEffect(() => {
    setCloseStream(false);
    const requestDeviceAccess = async () => {
      if (call?.isReceivingCall) {
        try {
          const currentStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          // myVideo.current.srcObject = currentStream;
          setStream(currentStream);
        } catch (error) {
          //TODO:如果用户禁止了摄像头或者麦克风权限应该怎么做
          console.log(error);
        }
      }
    };
    requestDeviceAccess();
  }, [call?.isReceivingCall, setStream]);

  useEffect(() => {
    if (stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  const handleCallAcceptButtonClick = () => {
    answerCall();
  };

  const handleCallDeclineButtonClick = () => {
    declineCall();
  };

  const handleLeaveCallButtonClick = () => {
    leaveCall();
  };

  return (
    <div className={styles.chatWindowContainer}>
      <ChatWindowLeftContent />
      <div className={styles.videoChatContainer}>
        {stream && (
          <div className={styles.videoContentContainer}>
            <video
              className={`${styles.videoChatVideo} ${
                showVideo ? styles.show : undefined
              }`}
              ref={myVideo}
              autoPlay={true}
            />
            <button
              className={styles.leaveCallButton}
              onClick={() => {
                handleLeaveCallButtonClick();
              }}
            >
              <ImPhoneHangUp size={25} />
            </button>
          </div>
        )}
        {stream &&
          (callAccepted ? (
            <div className={styles.videoContentContainer}>
              <video
                className={`${styles.videoChatVideo} ${
                  showVideo ? styles.show : undefined
                }`}
                ref={friendVideo}
                autoPlay={true}
              />
            </div>
          ) : friendIsCalling ? (
            <div className={styles.videoWaitingContentContainer}>
              <img
                className={styles.videoWaitingContentImg}
                src={friendIsCalling?.detail?.avatar}
                alt={friendIsCalling?.detail?.username}
              />
              <div className={styles.videoWaitingRing}></div>
            </div>
          ) : (
            <div className={styles.videoWaitingContentContainer}></div>
          ))}
      </div>
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
            <button
              className={styles.callDeclineButton}
              onClick={() => {
                handleCallDeclineButtonClick();
              }}
            >
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
