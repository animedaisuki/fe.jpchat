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
import useSound from "use-sound";
import Ring from "../assets/Sound/ミカヅキ.mp3";

const VideoChatContext = createContext(null);

const VideoChatProvider = ({ children }) => {
  const socket = useContext(SocketContext);
  const user = useContext(UserContext);

  const myVideo = useRef();
  const friendVideo = useRef();
  const connectionRef = useRef();

  const [stream, setStream] = useState(null);
  const [closeStream, setCloseStream] = useState(false);
  const [call, setCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [disableCallBtn, setDisableCallBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [play, { stop }] = useSound(Ring, { loop: true });

  useEffect(() => {
    if (playMusic) {
      play();
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [play, playMusic, stop]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("incomingCall", (data) => {
        const { sender, senderId, signalData } = data;
        setCall({ isReceivingCall: true, sender, senderId, signalData });
        setShowVideo(true);
        setPlayMusic(true);
        setDisableCallBtn(true);
      });

      socket.current.on("callDeclined", () => {
        console.log("call declined by other user");
        // 销毁 Peer 连接
        // if (connectionRef.current) {
        //   connectionRef.current.destroy();
        // }
        setIsCalling(false);
        setShowVideo(false);
        myVideo.current.srcObject = null;

        if (friendVideo.current) {
          friendVideo.current.srcObject = null;
        }

        setCloseStream(true);
        setDisableCallBtn(false);
        // window.location.reload();
      });

      socket.current.on("callIsBusy", () => {
        console.log("对方忙线中");
        setErrorMessage("Your friend is busy, please try again later");
        clearTimeout();
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
        setCall(null);
        setCallAccepted(false);
        setCallEnded(true);
        // 关闭摄像头和麦克风
        if (myVideo.current) {
          myVideo.current.srcObject = null;
        }
        if (stream) {
          stream.getTracks().forEach((track) => {
            if (track.readyState === "live") {
              track.stop();
            }
          });
        }
        setStream(null);
        setPlayMusic(false);
        setDisableCallBtn(false);
      });
    }
  }, [socket]);

  useEffect(() => {
    socket.current.on("callEnded", () => {
      console.log("callEnded");
      //在通话过程中掉线
      if (!callEnded) {
        console.log("对方通话中掉线");
        // connectionRef.current.destroy();
        setIsCalling(false);
        setShowVideo(false);
        if (myVideo.current) {
          myVideo.current.srcObject = null;
        }
        if (friendVideo.current) {
          friendVideo.current.srcObject = null;
        }
        setCloseStream(true);
        setCallEnded(true);
        setDisableCallBtn(false);
        setCall(null);

        //TODO:Check if there is a method to end a call with out refresh
        window.location.reload();
      }
      //在拨打电话时掉线
      if (!callAccepted) {
        setCall(null);
        setCallAccepted(false);
        setCallEnded(true);
        // 关闭摄像头和麦克风
        myVideo.current.srcObject = null;
        if (stream) {
          stream.getTracks().forEach((track) => {
            if (track.readyState === "live") {
              track.stop();
            }
          });
        }
        setStream(null);
        setPlayMusic(false);
        setDisableCallBtn(false);
        setCall(null);
      }
    });
  }, [callAccepted, callEnded, socket, stream]);

  useEffect(() => {
    socket.current.on("callLeaved", () => {
      console.log("对方主动关闭通话");
      // connectionRef.current.destroy();
      setIsCalling(false);
      setShowVideo(false);
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
      if (friendVideo.current) {
        friendVideo.current.srcObject = null;
      }
      setCloseStream(true);
      setCallEnded(true);
      setDisableCallBtn(false);
      //TODO:Check if there is a method to end a call with out refresh
      window.location.reload();
    });
  }, [socket]);

  useEffect(() => {
    console.log("close stream");
    // 关闭摄像头和麦克风
    if (closeStream && stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
      // setCloseStream(false);
      setStream(null);
      myVideo.current.srcObject = null;
      setDisableCallBtn(false);
    }
  }, [closeStream, stream]);

  // useEffect(() => {
  //   console.log(call);
  // }, [call]);

  const callUser = async (receiverId) => {
    if (stream) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
          // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          // iceServers: [{ urls: "stun:stun.ekiga.net" }],
          iceServers: [
            { urls: ["stun:oz-turn-1.xirsys.com"] },
            {
              username:
                "koQrX49Q0E-POu-L3VZEgId4mHhCnq52bLEhx7nXXJ7ky4XPPp0h2LNScNeoRwWpAAAAAGQ2NA9hbWFoYW5l",
              credential: "da879230-d8ea-11ed-97d6-0242ac120004",
              urls: [
                "turn:oz-turn-1.xirsys.com:80?transport=udp",
                "turn:oz-turn-1.xirsys.com:3478?transport=udp",
                "turn:oz-turn-1.xirsys.com:80?transport=tcp",
                "turn:oz-turn-1.xirsys.com:3478?transport=tcp",
                "turns:oz-turn-1.xirsys.com:443?transport=tcp",
                "turns:oz-turn-1.xirsys.com:5349?transport=tcp",
              ],
            },
          ],
        },
        stream,
      });

      peer.on("error", (err) => {
        console.error(err);
      });

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
        console.log("accepted");
        setCallAccepted(true);
        setCallEnded(false);
        setIsCalling(false);
        //TODO:有可能这里的peer是旧的peer？
        // console.log(peer);
        peer.signal(signalData);
      });
      connectionRef.current = peer;
      setShowVideo(true);
      setDisableCallBtn(true);
    }
  };

  const answerCall = async () => {
    //如果有媒体流（开启了摄像头和麦克风）
    if (stream) {
      setCallAccepted(true);
      setCallEnded(false);
      setCall({ ...call, isReceivingCall: false });

      const peer = new Peer({
        initiator: false,
        trickle: false,
        config: {
          // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          // iceServers: [{ urls: "stun:stun.ekiga.net" }],
          iceServers: [
            { urls: ["stun:oz-turn-1.xirsys.com"] },
            {
              username:
                "koQrX49Q0E-POu-L3VZEgId4mHhCnq52bLEhx7nXXJ7ky4XPPp0h2LNScNeoRwWpAAAAAGQ2NA9hbWFoYW5l",
              credential: "da879230-d8ea-11ed-97d6-0242ac120004",
              urls: [
                "turn:oz-turn-1.xirsys.com:80?transport=udp",
                "turn:oz-turn-1.xirsys.com:3478?transport=udp",
                "turn:oz-turn-1.xirsys.com:80?transport=tcp",
                "turn:oz-turn-1.xirsys.com:3478?transport=tcp",
                "turns:oz-turn-1.xirsys.com:443?transport=tcp",
                "turns:oz-turn-1.xirsys.com:5349?transport=tcp",
              ],
            },
          ],
        },
        stream,
      });

      peer.on("error", (err) => {
        console.error(err);
      });

      peer.on("signal", (signalData) => {
        const data = {
          signalData,
          senderId: call.senderId,
          receiverId: user.id,
        };

        socket.current?.emit("answerCall", data);
      });

      peer.on("stream", (currentStream) => {
        friendVideo.current.srcObject = currentStream;
      });

      peer.signal(call.signalData);

      //TODO:第二次接听以后channelName为null
      // console.log(peer);
      connectionRef.current = peer;

      setPlayMusic(false);
      //如果没有媒体流
    } else {
      //TODO:WHAT IF A USER DISABLE HIS CAMERA WHEN ANSWERING CALL
    }
    setDisableCallBtn(true);
  };

  const declineCall = () => {
    // 销毁 Peer 连接
    // if (connectionRef.current) {
    //   connectionRef.current.destroy();
    // }

    setShowVideo(false);
    const { senderId } = call;
    socket.current.emit("declineCall", senderId);

    setCall(null);
    setCallAccepted(false);
    setCallEnded(true);

    // 关闭摄像头和麦克风
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
    setStream(null);
    setPlayMusic(false);
    // stop();

    setDisableCallBtn(false);
    // window.location.reload();
  };

  const leaveCall = () => {
    setShowVideo(false);
    setCallEnded(true);
    setCallAccepted(false);
    setDisableCallBtn(false);
    setIsCalling(false);
    setCall(null);

    // 关闭摄像头和麦克风
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
    setStream(null);

    connectionRef.current.destroy();

    const userId = user.id;

    socket.current.emit("leaveCall", userId);

    //TODO:Check if there is a method to end a call with out refresh
    window.location.reload();
  };

  const logout = () => {
    setShowVideo(false);
    setCallEnded(true);
    setCallAccepted(false);
    setIsCalling(false);
    setShowVideo(false);
    setDisableCallBtn(false);
    setCall(null);

    setPlayMusic(false);
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }

    if (friendVideo.current) {
      friendVideo.current.srcObject = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }

    setCloseStream(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  // useEffect(() => {
  //   console.log("call accepted: ", callAccepted);
  //   console.log("call Ended: ", callEnded);
  // }, [callAccepted, callEnded]);

  return (
    <VideoChatContext.Provider
      value={{
        myVideo,
        friendVideo,
        stream,
        setStream,
        setCloseStream,
        call,
        setCall,
        isCalling,
        setIsCalling,
        callAccepted,
        setCallAccepted,
        callEnded,
        showVideo,
        disableCallBtn,
        errorMessage,
        callUser,
        answerCall,
        declineCall,
        leaveCall,
        logout,
      }}
    >
      {children}
    </VideoChatContext.Provider>
  );
};

export { VideoChatContext, VideoChatProvider };
