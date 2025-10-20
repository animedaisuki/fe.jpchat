import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { register } from "../../api/register/register";
// import HCaptcha from "@hcaptcha/react-hcaptcha"; // 已注释
// import config from "../../config/config"; // 如果只用于 HCaptcha，可以注释
import WindowCloseIcon from "../../components/WindoCloseIcon/WindowCloseIcon";
import WindowError from "../../components/WindowError/WindowError";
import { UserContext } from "../../context/UserInfoProvider";
import oshinokoBanner from "../../assets/Oshinoko/oshinoko_banner.png";
import oshinokoLoadingChar from "../../assets/Oshinoko/oshinoko_loding_char.jpg";
import oshinokoLoadingStage from "../../assets/Oshinoko/oshinoko_loading_stage.jpg";

export default function RegisterPage() {
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [emailRecorder, setEmailRecorder] = useState("");
  const [usernameRecorder, setUsernameRecorder] = useState("");
  const [passwordRecorder, setPasswordRecorder] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [hcToken, setHcToken] = useState(null); // 已移除
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasPassedChecks, setHasPassedChecks] = useState(false);
  const navigate = useNavigate();

  const myRef = useRef(null);
  // const captchaRef = useRef(null); // 已移除

  const userInfo = useContext(UserContext);

  if (userInfo) {
    navigate("/chat");
  }

  // const resetCaptcha = () => { // 已移除
  //   captchaRef.current.resetCaptcha();
  // };

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

  const onHandleSubmit = async (e) => {
    setIsRegistering(true);
    e.preventDefault();
    const data = {
      email: emailRecorder,
      username: usernameRecorder,
      password: passwordRecorder,
      checked,
      // token: hcToken, // 已移除
    };
    const result = await register(data);
    if (result.error) {
      if (result.status === 422) {
        setErrorMessage("Something goes wrong");
      } else {
        setErrorMessage(result.error.explanation);
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
    if (!result.error) {
      // 移除了 HCaptcha 验证检查
      setHasPassedChecks(true);
      setTimeout(() => {
        navigate("/login");
      }, 6300);
    }
    // resetCaptcha(); // 已移除
    setIsRegistering(false);
  };

  return (
    <>
      {hasPassedChecks ? (
        <div className={styles.oshinokoContainer}>
          <div className={styles.oshinokoBannerContainer}>
            <img
              className={styles.oshinokoBanner}
              src={oshinokoBanner}
              alt="banner"
            />
          </div>
          <div className={styles.oshinokoCharContainer}>
            <img
              className={styles.oshinokoChar}
              src={oshinokoLoadingChar}
              alt="banner"
            />
          </div>
          <div className={styles.oshinokoStageContainer}>
            <img
              className={styles.oshinokoStage}
              src={oshinokoLoadingStage}
              alt="banner"
            />
          </div>
        </div>
      ) : (
        <div className={styles.registerContainer}>
          <form
            className={styles.registerForm}
            onSubmit={(e) => {
              onHandleSubmit(e);
            }}
          >
            <WindowCloseIcon />
            {errorMessage && <WindowError errorMessage={errorMessage} />}
            <h2 className={styles.registerHeading}>Create an account</h2>
            <div className={styles.registerInputContainer}>
              <label className={styles.registerLabel}>Email</label>
              <input
                className={styles.registerInput}
                type="email"
                onChange={(e) => {
                  setEmailRecorder(e.target.value);
                }}
              />
              <label className={styles.registerLabel}>Username</label>
              <input
                className={styles.registerInput}
                type="text"
                onChange={(e) => {
                  setUsernameRecorder(e.target.value);
                }}
              />
              <label className={styles.registerLabel}>Password</label>
              <input
                className={styles.registerInput}
                type="password"
                ref={myRef}
                minLength={8}
                maxLength={16}
                onClick={() => {
                  setIsTypingPassword(true);
                }}
                onChange={(e) => {
                  setIsTypingPassword(true);
                  setPasswordRecorder(e.target.value);
                }}
              />
            </div>
            <div className={styles.registerCheckBoxContainer}>
              <input
                className={styles.registerCheckBox}
                type="checkbox"
                name="privacy-checkbox"
                onChange={(e) => {
                  setChecked(e.target.checked);
                }}
              />
              <label
                className={styles.registerCheckBoxLabel}
                htmlFor="privacy-checkbox"
              >
                I have read and agree to Doctrina's Terms of Service and Privacy
                Policy.
              </label>
            </div>
            {/* HCaptcha 组件已移除 */}
            {/* <div className={styles.registerHCaptcha}>
              <HCaptcha
                sitekey={config.hCaptchaSiteKey}
                onVerify={(token) => setHcToken(token)}
                onExpire={resetCaptcha}
                ref={captchaRef}
              />
            </div> */}
            <button className={styles.registerBtn} disabled={isRegistering}>
              Register
            </button>
            <p className={styles.registerToLoginNotification}>
              <Link className={styles.registerToLoginLink} to="/login">
                Already have an account?
              </Link>
            </p>
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
      )}
    </>
  );
}
