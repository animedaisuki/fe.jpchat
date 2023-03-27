import React from "react";
import styles from "./Homepage.module.scss";
import Heading from "../../components/Heading/Heading";
import HomepageIntro from "../../components/HomepageIntro/HomepageIntro";
import Footer from "../../components/Footer/Footer";
import Apple from "../../assets/HomepageBackground/apple.png";
import Google from "../../assets/HomepageBackground/google_play.png";
import Windows from "../../assets/HomepageBackground/windows.png";
import { v4 as uuid } from "uuid";

export default function Homepage() {
  const shopUrls = [
    {
      src: Apple,
      alt: "apple",
    },
    {
      src: Google,
      alt: "google",
    },
    {
      src: Windows,
      alt: "windows",
    },
  ];

  return (
    <>
      <Heading />
      <div className={styles.HomepageContainer}>
        <div className={styles.homepageVideoContainer}>
          <video
            className={styles.homepageVideo}
            src="https://amahane.s3.ap-northeast-1.amazonaws.com/homePageBg.mp4"
            autoPlay
            loop
            muted
          />
          <div className={styles.videoOverlay}>
            <div>
              <h1 className={styles.homePageTitle}>
                Explore Anime Land with Amahane Chat!
              </h1>
            </div>
            <div className={styles.platformContainer}>
              {shopUrls.map((shopUrl) => (
                <img
                  key={uuid()}
                  className={styles.platformImg}
                  src={shopUrl.src}
                  alt={shopUrl.alt}
                />
              ))}
            </div>
          </div>
        </div>
        <HomepageIntro />
      </div>
      <Footer />
    </>
  );
}
