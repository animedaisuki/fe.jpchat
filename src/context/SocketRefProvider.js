import React, { createContext, useRef } from "react";

const SocketContext = createContext(null);

const SocketInfoProvider = ({ children }) => {
  const socketRef = useRef(null);
  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketInfoProvider };
