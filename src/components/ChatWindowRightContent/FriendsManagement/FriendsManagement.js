import React, { useContext, useReducer } from "react";
import styles from "./FriendsManagement.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { ConversationContext } from "../../../context/ConversationProvider";
import { UserContext } from "../../../context/UserInfoProvider";
import FriendsManagementMain from "./FriendsManagementMain/FriendsManagementMain";

export default function FriendsManagement() {
  // const conversations = useContext(ConversationContext);
  // const user = useContext(UserContext);

  const initStatusState = { currentStatus: "ONLINE" };
  const StatusReducer = (statusState, action) => {
    switch (action.type) {
      case "ONLINE":
        return { currentStatus: "ONLINE" };
      case "ALL":
        return { currentStatus: "ALL" };
      case "PENDING":
        return { currentStatus: "PENDING" };
      case "BLOCKED":
        return { currentStatus: "BLOCKED" };
      case "ADD FRIEND":
        return { currentStatus: "ADD FRIEND" };
    }
  };

  const [statusState, dispatchStatus] = useReducer(
    StatusReducer,
    initStatusState
  );

  return (
    <div className={styles.friendsManagementContainer}>
      <div className={styles.friendsManagementHeading}>
        <div className={styles.friendsManagementHeadingLeftContent}>
          <div className={styles.friendsManagementHeadingIconContainer}>
            <FaUserFriends size={30} />
          </div>
          <button className={styles.friendsManagementHeadingFakeButton}>
            Friends
          </button>
        </div>
        <div className={styles.friendsManagementHeadingStatusButtons}>
          <button
            className={`${styles.friendsManagementHeadingStatusButton} ${
              statusState.currentStatus === "ONLINE" ? styles.active : undefined
            }`}
            onClick={() => {
              dispatchStatus({ type: "ONLINE" });
            }}
          >
            <p>Online</p>
          </button>
          <button
            className={`${styles.friendsManagementHeadingStatusButton} ${
              statusState.currentStatus === "ALL" ? styles.active : undefined
            }`}
            onClick={() => {
              dispatchStatus({ type: "ALL" });
            }}
          >
            <p>All</p>
          </button>
          <button
            className={`${styles.friendsManagementHeadingStatusButton} ${
              statusState.currentStatus === "PENDING"
                ? styles.active
                : undefined
            }`}
            onClick={() => {
              dispatchStatus({ type: "PENDING" });
            }}
          >
            <p>Pending</p>
          </button>
          <button
            className={`${styles.friendsManagementHeadingStatusButton} ${
              statusState.currentStatus === "BLOCKED"
                ? styles.active
                : undefined
            }`}
            onClick={() => {
              dispatchStatus({ type: "BLOCKED" });
            }}
          >
            <p>Blocked</p>
          </button>
          <button
            className={styles.friendsManagementHeadingAddFriendButton}
            onClick={() => {
              dispatchStatus({ type: "ADD FRIEND" });
            }}
          >
            <p>Add Friend</p>
          </button>
        </div>
      </div>
      <FriendsManagementMain statusState={statusState} />
    </div>
  );
}
