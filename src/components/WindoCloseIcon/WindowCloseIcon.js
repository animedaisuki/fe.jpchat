import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import styles from "./WindowCloseIcon.module.scss";

export default function WindowCloseIcon() {
  return (
    <Link to="/">
      <div className={styles.windowCloseIconContainer}>
        <IoClose className={styles.windowCloseIcon} size={20} />
      </div>
    </Link>
  );
}
