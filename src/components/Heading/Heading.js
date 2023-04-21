import React, { useContext } from "react";
import styles from "./Heading.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserInfoProvider";
import { UserDispatchContext } from "../../context/UserInfoProvider";

export default function Heading() {
  const user = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    setUserInfo(null);
    navigate("/");
  };
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
        {user ? (
          <div className={styles.headingUserOuterContainer}>
            <div className={styles.headingUserContainer}>
              <img
                src={user.avatar}
                className={styles.headingUserAvatar}
                alt={user.username}
              />
              <div className={styles.headingUserActionContainer}>
                <button
                  className={styles.headingUserAction}
                  onClick={() => {
                    navigate("/chat");
                  }}
                >
                  Chat
                </button>
                <button className={styles.headingUserAction} onClick={logout}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.homepageLogin}>
              <Link className={styles.homepageToLogin} to="/login">
                Log In
              </Link>
            </p>
            <BsPersonCircle />
          </>
        )}
      </div>
    </div>
  );
}
