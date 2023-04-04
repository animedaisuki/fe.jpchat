import React, { createContext, useState } from "react";

const FriendsOfUserContext = createContext(null);
const FriendsOfUserDispatchContext = createContext(() => {});

const FriendsOfUserProvider = ({ children }) => {
  const [friends, setFriends] = useState();
  return (
    <FriendsOfUserContext.Provider value={friends}>
      <FriendsOfUserDispatchContext.Provider value={setFriends}>
        {children}
      </FriendsOfUserDispatchContext.Provider>
    </FriendsOfUserContext.Provider>
  );
};

export {
  FriendsOfUserContext,
  FriendsOfUserDispatchContext,
  FriendsOfUserProvider,
};
