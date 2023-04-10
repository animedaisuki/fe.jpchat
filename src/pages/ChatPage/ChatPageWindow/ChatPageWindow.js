import React, { useContext } from "react";
import styles from "./ChatPageWindow.module.scss";
import ChatWindowLeftContent from "../../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { Outlet } from "react-router-dom";
import { VideoChatContext } from "../../../context/VideoChatContext";
import { IoCall } from "react-icons/io5";
import { ImCross } from "react-icons/im";

export default function ChatPageWindow() {
  const { call } = useContext(VideoChatContext);

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
          <h2 className={styles.senderName}>{call.sender.username}</h2>
          <div className={styles.callButtonsContainer}>
            <button className={styles.callDeclineButton}>
              <ImCross size={30} />
            </button>
            <button className={styles.callAcceptButton}>
              <IoCall size={30} />
            </button>
          </div>
        </div>
      )}
      {/*<div className={styles.chatWindowRightContent}></div>*/}
      <Outlet />
    </div>
  );
}
