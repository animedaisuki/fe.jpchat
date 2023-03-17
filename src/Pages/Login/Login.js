import React from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <div className={styles.loginHeading}>
          <h2>Welcome Back</h2>
          <p className={styles.loginDesc}>Nice to see you again!</p>
        </div>
        <div className={styles.loginInputContainer}>
          <label className={styles.loginLabel}>Email address</label>
          <input className={styles.loginInput} type="email" />
          <label className={styles.loginLabel}>Password</label>
          <input className={styles.loginInput} type="password" />
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
      </form>
    </div>
  );
}
