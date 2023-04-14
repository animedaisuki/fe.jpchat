import React from "react";
import styles from "./ChatPage.module.scss";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { ConversationProvider } from "../../context/ConversationProvider";
import { FriendsOfUserProvider } from "../../context/FriendsOfUserProvider";
import { ChatGptConversationProvider } from "../../context/ChatGptConversationProvider";
import { AIFriendsOfUserProvider } from "../../context/AIFriendOfUserProvider";
import { VideoChatProvider } from "../../context/VideoChatContext";
import ChatPageWindow from "./ChatPageWindow/ChatPageWindow";
import { FriendIsCallingProvider } from "../../context/FriendIsCallingProvider";
import { Provider } from "react-redux";
import store from "../../store";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <ConversationProvider>
        <FriendsOfUserProvider>
          <Provider store={store}>
            <ChatGptConversationProvider>
              <AIFriendsOfUserProvider>
                <VideoChatProvider>
                  <FriendIsCallingProvider>
                    <div className={styles.chatPageContainer}>
                      <ChatPageWindow />
                    </div>
                  </FriendIsCallingProvider>
                </VideoChatProvider>
              </AIFriendsOfUserProvider>
            </ChatGptConversationProvider>
          </Provider>
        </FriendsOfUserProvider>
      </ConversationProvider>
    </SocketInfoProvider>
  );
}
