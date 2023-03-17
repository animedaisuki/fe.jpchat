import React from "react";
import styles from "./Homepage.module.scss";

export default function Homepage() {
  return (
    <div className={styles.HomepageContainer}>
      <div className={styles.homepageVideoContainer}>
        <video
          className={styles.homepageVideo}
          // src="http://konosuba.com/bakuen/assets/img/index/pv.mp4"
          src="https://genshin.hoyoverse.com/_nuxt/videos/3e78e80.mp4"
          autoPlay
          loop
          muted
        />
        <div className={styles.videoOverlay}>
          <div>
            <h1 className={styles.homePageTitle}>
              JP Chat is Now Released on Multiple Platforms!
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.test}>12345</div>
    </div>
  );
}
