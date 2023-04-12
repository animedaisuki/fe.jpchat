import React, { createContext, useState } from "react";

const FriendIsCallingContext = createContext(null);

const FriendIsCallingProvider = ({ children }) => {
  const [friendIsCalling, setFriendIsCalling] = useState(null);
  return (
    <FriendIsCallingContext.Provider
      value={{ friendIsCalling, setFriendIsCalling }}
    >
      {children}
    </FriendIsCallingContext.Provider>
  );
};

export { FriendIsCallingContext, FriendIsCallingProvider };
