import React from "react";
import styles from "./ChatPage.module.scss";
import { SocketInfoProvider } from "../../context/SocketRefProvider";
import { VideoChatProvider } from "../../context/VideoChatContext";
import ChatPageWindow from "./ChatPageWindow/ChatPageWindow";
import { Provider } from "react-redux";
import store from "../../store";

export default function ChatPage() {
  return (
    <SocketInfoProvider>
      <Provider store={store}>
        <VideoChatProvider>
          <div className={styles.chatPageContainer}>
            <ChatPageWindow />
          </div>
        </VideoChatProvider>
      </Provider>
    </SocketInfoProvider>
  );
}
