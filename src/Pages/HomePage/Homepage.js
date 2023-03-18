import React from "react";
import styles from "./Homepage.module.scss";
import Heading from "../../Components/Heading/Heading";
import HomepageIntro from "../../Components/HomepageIntro/HomepageIntro";

export default function Homepage() {
  const shopUrls = [
    {
      src: "https://webstatic.hoyoverse.com/upload/event/2020/12/14/6ff53bc5d797e9efc2ac7b2b602c267a_8295237617862628623.png",
      alt: "apple",
    },
    {
      src: "https://webstatic.hoyoverse.com/upload/event/2020/12/14/396b8eb0d0d2f27aadb476e0b62d0926_8878641138830187947.png",
      alt: "google",
    },
    {
      src: "https://webstatic.hoyoverse.com/upload/event/2020/12/14/a27edf5aa048e9509f0850856ad3f403_396608336029707725.png",
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
            // src="http://konosuba.com/bakuen/assets/img/index/pv.mp4"
            src={require("../../assets/HomepageBackground/homePageBg.mp4")}
            autoPlay
            loop
            muted
          />
          <div className={styles.videoOverlay}>
            <div>
              <h1 className={styles.homePageTitle}>
                Explore Anime Land with JP Chat!
              </h1>
            </div>
            <div className={styles.platformContainer}>
              {shopUrls.map((shopUrl) => (
                <img
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
    </>
  );
}
