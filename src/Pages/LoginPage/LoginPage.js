import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

export default function LoginPage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.loginContainer}>
      <form
        className={styles.loginForm}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.loginHeading}>
          <h2>Welcome Back</h2>
          <p className={styles.loginDesc}>Nice to see you again!</p>
        </div>
        <div className={styles.loginInputContainer}>
          <label className={styles.loginLabel}>Email address</label>
          <input className={styles.loginInput} type="email" />
          <label className={styles.loginLabel}>Password</label>
          <input
            className={styles.loginInput}
            ref={myRef}
            type="password"
            onClick={() => {
              setIsTypingPassword(true);
            }}
          />
          <p className={styles.loginToForgetPassword}>
            <Link className={styles.loginToForgetPasswordLink} to="">
              Forget your password?
            </Link>
          </p>
        </div>
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
        <p className={styles.loginRegisterNotification}>
          Need an account?{" "}
          <Link className={styles.loginToRegisterLink} to="">
            Register here
          </Link>
        </p>
        {isTypingPassword ? (
          <>
            <img
              className={styles.loginBottomLeftImg}
              src={require("../../assets/LoginPage/left-close.png")}
              alt="hime-left-close"
            />
            <img
              className={styles.loginBottomRightImg}
              src={require("../../assets/LoginPage/right-close.png")}
              alt="hime-right-close"
            />
          </>
        ) : (
          <>
            <img
              className={styles.loginBottomLeftImg}
              src={require("../../assets/LoginPage/left-open.png")}
              alt="hime-left-open"
            />
            <img
              className={styles.loginBottomRightImg}
              src={require("../../assets/LoginPage/right-open.png")}
              alt="hime-right-open"
            />
          </>
        )}
      </form>
    </div>
  );
}
