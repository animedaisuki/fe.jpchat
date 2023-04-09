import React from "react";
import styles from "./ErrorPage.module.scss";
import cryAnimationSticker from "../../assets/mafumafuStickers/1997494551@2x.gif";

export default function ErrorPage() {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.errorContainer}>
        <img
          className={styles.cryAnimationImg}
          src={cryAnimationSticker}
          alt="mafumafu cry"
        />
        <h1 className={styles.errorPageTitle}>404</h1>
        <p className={styles.errorPageDesc}>
          The page you are looking for does not exist
        </p>
      </div>
    </div>
  );
}
