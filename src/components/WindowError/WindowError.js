import React from "react";
import styles from "./WindowError.module.scss";
import { MdError } from "react-icons/md";

export default function WindowError(props) {
  const { errorMessage } = props;
  return (
    <div className={styles.windowErrorContainer}>
      <div className={styles.windowIconErrorContainer}>
        <MdError />
      </div>
      <div className={styles.windowErrorMsgContainer}>
        <p className={styles.windowErrorMsg}>{errorMessage}</p>
      </div>
    </div>
  );
}
