import React from "react";
import styles from "./ChatPage.module.scss";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { ConversationProvider } from "../../context/ConversationProvider";
import { ChatGptConversationProvider } from "../../context/ChatGptConversationProvider";
import { AIFriendsOfUserProvider } from "../../context/AIFriendOfUserProvider";
import { VideoChatProvider } from "../../context/VideoChatContext";
import ChatPageWindow from "./ChatPageWindow/ChatPageWindow";
import { Provider } from "react-redux";
import store from "../../store";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <ConversationProvider>
        <Provider store={store}>
          <ChatGptConversationProvider>
            <AIFriendsOfUserProvider>
              <VideoChatProvider>
                <div className={styles.chatPageContainer}>
                  <ChatPageWindow />
                </div>
              </VideoChatProvider>
            </AIFriendsOfUserProvider>
          </ChatGptConversationProvider>
        </Provider>
      </ConversationProvider>
    </SocketInfoProvider>
  );
}
