import React from "react";
import styles from "./Footer.module.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.footContainer}>
      <div className={styles.socialContainer}>
        <FaFacebookF className={styles.social} />
        <FaTwitter className={styles.social} />
        <FaYoutube className={styles.social} />
        <FaInstagram className={styles.social} />
        <FaDiscord className={styles.social} />
      </div>
      <div className={styles.footerContentContainer}>
        <p className={styles.footerContent}>Privacy Policy</p>
        <p className={styles.footerContent}>Terms of Service</p>
        <p className={styles.footerContent}>About Us</p>
        <p className={styles.footerContent}>Contact Us</p>
      </div>
      <div className={styles.footerDescContainer}>
        <p className={styles.footerDesc}>
          "PlayStation Family Mark," "PS5 logo" and "PS4 logo" are registered
          trademarks or trademarks of Sony Interactive Entertainment Inc.
        </p>
        <p className={styles.footerDesc}>
          Epic, Epic Games, Epic Games Store, the Epic Games Store logo, and
          Epic Online Services are trademarks and/or registered trademarks of
          Epic Games. All other trademarks are the property of their respective
          owners.
        </p>
      </div>
      <div className={styles.footerLogoContainer}>
        <img
          className={styles.footerLogo}
          src={require("../../assets/Logo/doctrina.png")}
          alt="logo"
        />
      </div>
      <div className={styles.footerCopyrightContainer}>
        <p className={styles.footerCopyright}>
          Copyright © DOCTRINA. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
