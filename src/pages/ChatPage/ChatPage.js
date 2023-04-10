import React from "react";
import styles from "./ChatPage.module.scss";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { ConversationProvider } from "../../context/ConversationProvider";
import { FriendsOfUserProvider } from "../../context/FriendsOfUserProvider";
import { ChatGptConversationProvider } from "../../context/ChatGptConversationProvider";
import { AIFriendsOfUserProvider } from "../../context/AIFriendOfUserProvider";
import { VideoChatProvider } from "../../context/VideoChatContext";
import ChatPageWindow from "./ChatPageWindow/ChatPageWindow";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <ConversationProvider>
        <FriendsOfUserProvider>
          <ChatGptConversationProvider>
            <AIFriendsOfUserProvider>
              <VideoChatProvider>
                <div className={styles.chatPageContainer}>
                  <ChatPageWindow />
                </div>
              </VideoChatProvider>
            </AIFriendsOfUserProvider>
          </ChatGptConversationProvider>
        </FriendsOfUserProvider>
      </ConversationProvider>
    </SocketInfoProvider>
  );
}
