import React, { createContext, useState } from "react";

const CurrentFriendContext = createContext({});
const CurrentFriendDispatchContext = createContext(() => {});

const CurrentFriendInfoProvider = ({ children }) => {
  const [currentFriend, setCurrentFriend] = useState({});
  return (
    <CurrentFriendContext.Provider value={currentFriend}>
      <CurrentFriendDispatchContext.Provider value={setCurrentFriend}>
        {children}
      </CurrentFriendDispatchContext.Provider>
    </CurrentFriendContext.Provider>
  );
};

export {
  CurrentFriendContext,
  CurrentFriendDispatchContext,
  CurrentFriendInfoProvider,
};
