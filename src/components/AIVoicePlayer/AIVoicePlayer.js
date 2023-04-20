import React, { useContext, useRef, useState } from "react";
import { convertTextToAudio } from "../../api/tts/tts";
import styles from "./AIVoicePlayer.module.scss";
import { BsSoundwave } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../context/UserInfoProvider";

const AIVoicePlayer = (props) => {
  const { text } = props;
  const user = useContext(UserContext);
  const audioRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = async () => {
    setIsLoading(true);
    try {
      const response = await convertTextToAudio({
        text,
        user,
      });
      const audioBlob = new Blob([response.data], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = 1.2;
      audioRef.current.play();
    } catch (error) {
      //TODO:When there is an error show error window
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <audio className={styles.audio} ref={audioRef} controls />
      <button
        className={`${styles.aiSpeakButton} ${
          isLoading ? styles.disable : undefined
        }`}
        onClick={playAudio}
        disabled={isLoading}
      >
        {isLoading ? (
          <ThreeDots color="#9fa3a9" height="12" width="12" />
        ) : (
          <BsSoundwave size={12} />
        )}
      </button>
    </div>
  );
};

export default AIVoicePlayer;
