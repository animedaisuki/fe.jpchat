import React from "react";
import styles from "./FriendManagement.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function FriendsManagement() {
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
          <button className={styles.friendsManagementHeadingStatusButton}>
            <p>Online</p>
          </button>
          <button className={styles.friendsManagementHeadingStatusButton}>
            <p>All</p>
          </button>
          <button className={styles.friendsManagementHeadingStatusButton}>
            <p>Pending</p>
          </button>
          <button className={styles.friendsManagementHeadingStatusButton}>
            <p>Blocked</p>
          </button>
          <button className={styles.friendsManagementHeadingAddFriendButton}>
            <p>Add Friend</p>
          </button>
        </div>
      </div>
      <div className={styles.friendManagementMainContainer}>
        <div className={styles.friendSearchBarContainer}>
          <input
            className={styles.friendSearchBar}
            type="text"
            placeholder="Search"
          />
          <div className={styles.friendSearchBarSearchIcon}>
            <FiSearch />
          </div>
        </div>
        <div className={styles.friendManagementOverviewContainer}>
          <div className={styles.friendsManagementOverviewDescContainer}>
            <h5 className={styles.friendsManagementOverviewDesc}>
              ONLINE FRIENDS - 3
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
