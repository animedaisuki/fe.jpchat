import React from "react";
import styles from "./Heading.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Heading() {
  return (
    <div className={styles.headingContainer}>
      <img
        className={styles.headingLogoImg}
        src={require("../../assets/Logo/doctrina.png")}
        alt="logo"
      />
      <div className={styles.headingOptions}>
        <p className={styles.headingOption}>Home</p>
        <p className={styles.headingOption}>News</p>
        <p className={styles.headingOption}>About</p>
        <p className={styles.headingOption}>More</p>
      </div>
      <div className={styles.homepageLoginContainer}>
        <p className={styles.homepageLogin}>
          <Link className={styles.homepageToLogin} to="/login">
            Log In
          </Link>
        </p>
        <BsPersonCircle />
      </div>
    </div>
  );
}
