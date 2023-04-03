import React from "react";
import styles from "./ChatPage.module.scss";
import { Outlet } from "react-router-dom";
import ChatWindowLeftContent from "../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { ConversationProvider } from "../../context/ConversationProvider";

export default function ChatPage() {
  return (
    <ConversationProvider>
      <SocketInfoProvider>
        <div className={styles.chatPageContainer}>
          <div className={styles.chatWindowContainer}>
            <ChatWindowLeftContent />
            {/*<div className={styles.chatWindowRightContent}></div>*/}
            <Outlet />
          </div>
        </div>
      </SocketInfoProvider>
    </ConversationProvider>
  );
}
