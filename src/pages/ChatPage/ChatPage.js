import React from "react";
import styles from "./ChatPage.module.scss";
import { Outlet } from "react-router-dom";
import ChatWindowLeftContent from "../../components/ChatWindowLeftContent/ChatWindowLeftContent";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { ConversationProvider } from "../../context/ConversationProvider";
import { FriendsOfUserProvider } from "../../context/FriendsOfUserProvider";
import { ChatGptConversationProvider } from "../../context/ChatGptConversationProvider";
import { AIFriendsOfUserProvider } from "../../context/AIFriendOfUserProvider";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <ConversationProvider>
        <FriendsOfUserProvider>
          <ChatGptConversationProvider>
            <AIFriendsOfUserProvider>
              <div className={styles.chatPageContainer}>
                <div className={styles.chatWindowContainer}>
                  <ChatWindowLeftContent />
                  {/*<div className={styles.chatWindowRightContent}></div>*/}
                  <Outlet />
                </div>
              </div>
            </AIFriendsOfUserProvider>
          </ChatGptConversationProvider>
        </FriendsOfUserProvider>
      </ConversationProvider>
    </SocketInfoProvider>
  );
}
