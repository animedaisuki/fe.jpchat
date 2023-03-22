import React, { useEffect, useRef, useState } from "react";
import styles from "./Register.module.scss";

export default function RegisterPage() {
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const myRef = useRef(null);
  const handleClickOutside = (e) => {
    const target = e.target;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setIsTypingPassword(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.registerContainer}>
      <form
        className={styles.registerForm}
        onSubmit={(e) => {
          onHandleSubmit(e);
        }}
      >
        <h2 className={styles.registerHeading}>Create an account</h2>
        <div className={styles.registerInputContainer}>
          <label className={styles.registerLabel}>Email</label>
          <input className={styles.registerInput} type="email" />
          <label className={styles.registerLabel}>Username</label>
          <input className={styles.registerInput} type="text" />
          <label className={styles.registerLabel}>Password</label>
          <input
            className={styles.registerInput}
            type="password"
            ref={myRef}
            onClick={() => {
              setIsTypingPassword(true);
            }}
          />
        </div>
        <div className={styles.registerCheckBoxContainer}>
          <input
            className={styles.registerCheckBox}
            type="checkbox"
            name="privacy-checkbox"
          />
          <label
            className={styles.registerCheckBoxLabel}
            htmlFor="privacy-checkbox"
          >
            I have read and agree to Doctrina's Terms of Service and Privacy
            Policy.
          </label>
        </div>
        <button className={styles.registerBtn}>Register</button>
        {isTypingPassword ? (
          <>
            <img
              className={styles.registerBottomLeftImg}
              src={require("../../assets/LoginPage/left-close.png")}
              alt="hime-left-close"
            />
            <img
              className={styles.registerBottomRightImg}
              src={require("../../assets/LoginPage/right-close.png")}
              alt="hime-right-close"
            />
          </>
        ) : (
          <>
            <img
              className={styles.registerBottomLeftImg}
              src={require("../../assets/LoginPage/left-open.png")}
              alt="hime-left-open"
            />
            <img
              className={styles.registerBottomRightImg}
              src={require("../../assets/LoginPage/right-open.png")}
              alt="hime-right-open"
            />
          </>
        )}
      </form>
    </div>
  );
}
