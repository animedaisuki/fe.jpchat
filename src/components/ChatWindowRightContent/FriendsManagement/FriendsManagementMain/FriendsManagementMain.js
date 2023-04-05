import React, { useContext } from "react";
import styles from "./FriendsManagementMain.module.scss";
import { FiSearch } from "react-icons/fi";
import ActiveFriendsList from "./ActiveFriendsList/ActiveFriendsList";
import { v4 as uuid } from "uuid";
import { FriendsOfUserContext } from "../../../../context/FriendsOfUserProvider";

export default function FriendsManagementMain(props) {
  const { statusState } = props;
  const friends = useContext(FriendsOfUserContext);
  const onlineFriends = friends?.filter((friend) => friend.isOnline === true);

  // if (
  //   statusState.currentStatus === "ONLINE" ||
  //   statusState.currentStatus === "ALL"
  // ) {
  //   conversations?.forEach((conversation) => {
  //     const friend = conversation.members.find(
  //       (member) => member._id !== user.id
  //     );
  //     friends.push({ user: friend, conversationId: conversation._id });
  //   });
  // }

  return (
    <div className={styles.friendManagementMainContainer}>
      {statusState.currentStatus !== "ADD FRIEND" && (
        <>
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
                {statusState?.currentStatus} -{" "}
                {statusState.currentStatus === "ALL" && friends?.length}
                {statusState.currentStatus === "ONLINE" &&
                  onlineFriends?.length}
                {(statusState.currentStatus === "PENDING" ||
                  statusState.currentStatus === "BLOCKED") &&
                  "0"}
              </h5>
            </div>
          </div>
        </>
      )}
      <div className={styles.activeFriendsOuterContainer}>
        {statusState.currentStatus === "ONLINE" &&
          onlineFriends?.map((friend) => (
            <ActiveFriendsList key={uuid()} friend={friend} />
          ))}
        {statusState.currentStatus === "ALL" &&
          friends?.map((friend) => (
            <ActiveFriendsList key={uuid()} friend={friend} />
          ))}
      </div>
      {statusState.currentStatus === "ADD FRIEND" && (
        <div className={styles.addFriendContainer}>
          <div className={styles.addFriendTitleAndDescContainer}>
            <h3 className={styles.addFriendTitle}>ADD FRIEND</h3>
            <p className={styles.addFriendDesc}>
              You can add a friend with their Amahane Username. It's
              cAsE-sEnSitIvE!
            </p>
          </div>

          <div className={styles.addFriendInputContainer}>
            <input
              className={styles.addFriendInput}
              type="text"
              placeholder="Enter a Username"
            />
            <button className={styles.addFriendButton}>
              Send Friend Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
