import React from "react";
import styles from "./UserSettingRightContent.module.scss";

export default function UserSettingRightContent() {
  return (
    <div className={styles.userSettingRightContainer}>
      <h6 className={styles.userPreviewTitle}>Preview</h6>
      <div className={styles.previewCardContainer}></div>
    </div>
  );
}
