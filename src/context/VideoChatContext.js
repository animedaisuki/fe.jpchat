import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "./SocketRefProvider";
import Peer from "simple-peer";
import { UserContext } from "./UserInfoProvider";

const VideoChatContext = createContext(null);

const VideoChatProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const myVideo = useRef();
  const receiverVideo = useRef();

  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("incomingCall", (data) => {
        const { sender, senderId, signalData } = data;
        console.log(data);
        setCall({ isReceivingCall: true, sender, senderId, signalData });
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(call);
  }, [call]);

  const callUser = async (receiverId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.current?.emit("callUser", {
        sender: user,
        senderId: user.id,
        receiverId,
        signalData: data,
      });
    });

    peer.on("stream", (currentStream) => {
      receiverVideo.current.srcObject = currentStream;
    });

    //TODO:Call Accepted
  };

  return (
    <VideoChatContext.Provider
      value={{
        myVideo,
        receiverVideo,
        stream,
        setStream,
        call,
        setCall,
        isCalling,
        setIsCalling,
        callUser,
      }}
    >
      {children}
    </VideoChatContext.Provider>
  );
};

export { VideoChatContext, VideoChatProvider };
