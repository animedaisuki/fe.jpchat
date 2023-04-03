import React from "react";
import styles from "./ChatPage.module.scss";
import { Outlet } from "react-router-dom";
import ChatWindowLeftContent from "../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { SocketInfoProvider } from "../../context/SocketRefProvider";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <div className={styles.chatPageContainer}>
        <div className={styles.chatWindowContainer}>
          <ChatWindowLeftContent />
          {/*<div className={styles.chatWindowRightContent}></div>*/}
          <Outlet />
        </div>
      </div>
    </SocketInfoProvider>
  );
}
