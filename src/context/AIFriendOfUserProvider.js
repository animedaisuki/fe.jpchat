import React, { createContext, useState } from "react";

const AIFriendOfUserContext = createContext(null);
const AIFriendOfUserDispatchContext = createContext(() => {});

const AIFriendsOfUserProvider = ({ children }) => {
  const [AIFriend, setAIFriend] = useState([]);
  return (
    <AIFriendOfUserContext.Provider value={AIFriend}>
      <AIFriendOfUserDispatchContext.Provider value={setAIFriend}>
        {children}
      </AIFriendOfUserDispatchContext.Provider>
    </AIFriendOfUserContext.Provider>
  );
};

export {
  AIFriendOfUserContext,
  AIFriendOfUserDispatchContext,
  AIFriendsOfUserProvider,
};
