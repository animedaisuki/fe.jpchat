import React, { useRef, useState } from "react";
import styles from "./About.module.scss";
import backgroundImage from "../../assets/AboutPage/about-bg.png";
import photoFrame from "../../assets/AboutPage/photo_frame.png";
import globalIcon from "../../assets/AboutPage/global-icon.png";
import catGirlImg from "../../assets/AboutPage/pio-smile.png";
import thumbnail from "../../assets/AboutPage/thumbnail.png";
import register from "../../assets/AboutPage/about-button.png";
import aqua from "../../assets/AboutPage/aqua.png";
import ruby from "../../assets/AboutPage/ruby.png";
import toho from "../../assets/AboutPage/toho.png";
import castle from "../../assets/AboutPage/castle.png";
import xirsys from "../../assets/AboutPage/xirsys.png";
import chatgpt from "../../assets/AboutPage/chatgpt.png";
import { v4 as uuid } from "uuid";
import IntroductionCard from "../../components/IntroductionCard/IntroductionCard";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainContainerRef = useRef(null);

  const handleScroll = () => {
    const position = mainContainerRef.current.scrollTop;
    setScrollPosition(position);
  };

  const cards = [
    {
      id: uuid(),
      charImg: aqua,
      bannerImg: toho,
      icon: xirsys,
      position: "left",
      title: "Real-Time Chat Services",
      firstPara:
        "Experience seamless communication on our platform, featuring real-time\n" +
        "chat services built on WebSockets for instant messaging and effortless\n" +
        "friend connections.",
      secondPara:
        "Enjoy stable, low-latency video and voice chat, powered by WebRTC\n" +
        "technology and optimized using Xirsys for enhanced performance.",
      thirdPara: null,
    },
    {
      id: uuid(),
      charImg: ruby,
      bannerImg: castle,
      icon: chatgpt,
      position: "right",
      title: "Advanced AI Chat Capabilities",
      firstPara:
        "Dive into the captivating world of Amahane Chat and indulge in a tailor-made chat experience that " +
        "caters to individual interests.",
      secondPara:
        "Experience unparalleled interaction with advanced AI chat capabilities on Amahane Chat, where the platform " +
        "seamlessly integrates ChatGPT-3.5 and Azure TTS.",
      thirdPara:
        "Choose personalized language and voice options for a truly customized experience that caters to your preferences.",
    },
  ];

  return (
    <div
      className={styles.aboutContainer}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      ref={mainContainerRef}
      onScroll={handleScroll}
    >
      <div
        className={`${styles.overlay} ${
          scrollPosition <= 270 ? styles.hidden : undefined
        }`}
      ></div>
      <div
        className={`${styles.globalIconContainer} ${
          scrollPosition <= 270 ? undefined : styles.hidden
        }`}
      >
        <Link to="/">
          <img className={styles.globalIcon} src={globalIcon} alt="global" />
        </Link>
      </div>

      <div
        className={`${styles.aboutTitleContainer} ${
          scrollPosition <= 270 ? undefined : styles.hidden
        }`}
      >
        <p className={styles.aboutTitle}>Welcome to</p>
        <p className={styles.aboutTitle}>Amahane Chat</p>
      </div>

      <div className={styles.aboutMainContainer}>
        <div className={styles.aboutMainRelativeContainer}>
          <div className={styles.photoFrameContainer}>
            <img className={styles.photoFrame} src={photoFrame} alt="frame" />
            <div className={styles.live2dImgContainer}>
              <img
                className={styles.live2dImg}
                src={thumbnail}
                alt="live2d poster"
              />
            </div>
            <div className={styles.catGirlImgContainer}>
              <img
                className={styles.catGirlImg}
                src={catGirlImg}
                alt="cat girl"
              />
              <h1 className={styles.catGirlName}>Chtholly</h1>
            </div>
            <div className={styles.registerContainer}>
              <h3 className={styles.registerTitle}>Meet Your Own Cat Girl!</h3>
              <button className={styles.registerButton}>
                <Link to="/register">
                  <img
                    className={styles.registerButtonImg}
                    src={register}
                    alt={"register"}
                  />
                  <p className={styles.registerText}>Register</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.bannerContainer}>
          <video
            className={styles.bannerVideo}
            src="https://amahane.s3.ap-northeast-1.amazonaws.com/aboutUsPage/about-us-banner.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <h1 className={styles.bannerTitle}>About Amahane Chat</h1>
        </div>
        <div className={styles.catGirlDetailContainer}>
          <div className={styles.gridContainer}>
            {cards.map((card) => (
              <IntroductionCard
                key={card.id}
                charImg={card.charImg}
                bannerImg={card.bannerImg}
                position={card.position}
                icon={card.icon}
                title={card.title}
                firstPara={card.firstPara}
                secondPara={card.secondPara}
                thirdPara={card.thirdPara}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
