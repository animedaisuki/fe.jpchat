import React, { createContext, useState } from "react";

const ConversationContext = createContext(null);
const ConversationDispatchContext = createContext(() => {});

const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState(null);
  return (
    <ConversationContext.Provider value={conversations}>
      <ConversationDispatchContext.Provider value={setConversations}>
        {children}
      </ConversationDispatchContext.Provider>
    </ConversationContext.Provider>
  );
};

export {
  ConversationContext,
  ConversationDispatchContext,
  ConversationProvider,
};
