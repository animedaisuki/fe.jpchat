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
  const friendVideo = useRef();
  const connectionRef = useRef();

  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

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
    peer.on("signal", (signalData) => {
      socket.current?.emit("callUser", {
        sender: user,
        senderId: user.id,
        receiverId,
        signalData,
      });
    });

    peer.on("stream", (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });

    socket.current?.on("callAccepted", (signalData) => {
      setCallAccepted(true);
      setCall({ ...call, isReceivingCall: false });
      setIsCalling(false);
      peer.signal(signalData);
    });

    connectionRef.current = peer;
  };

  const answerCall = async () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (signalData) => {
      const data = { signalData, senderId: call.senderId };
      socket.current?.emit("answerCall", data);
    });

    peer.on("stream", (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signalData);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current = null;
  };

  return (
    <VideoChatContext.Provider
      value={{
        myVideo,
        friendVideo,
        stream,
        setStream,
        call,
        setCall,
        isCalling,
        setIsCalling,
        callAccepted,
        setCallAccepted,
        callUser,
        answerCall,
        leaveCall,
      }}
    >
      {children}
    </VideoChatContext.Provider>
  );
};

export { VideoChatContext, VideoChatProvider };
