import React, { createContext, useState } from "react";

const ChatGptConversationContext = createContext({});
const ChatGptConversationDispatchContext = createContext(() => {});

const ChatGptConversationProvider = ({ children }) => {
  const [chatGptConversation, setChatGptConversation] = useState(null);
  return (
    <ChatGptConversationContext.Provider value={chatGptConversation}>
      <ChatGptConversationDispatchContext.Provider
        value={setChatGptConversation}
      >
        {children}
      </ChatGptConversationDispatchContext.Provider>
    </ChatGptConversationContext.Provider>
  );
};

export {
  ChatGptConversationContext,
  ChatGptConversationDispatchContext,
  ChatGptConversationProvider,
};
