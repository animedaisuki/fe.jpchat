import React, { useContext } from "react";
import styles from "./FriendsManagementMain.module.scss";
import { FiSearch } from "react-icons/fi";
import { ConversationContext } from "../../../../context/ConversationProvider";
import { UserContext } from "../../../../context/UserInfoProvider";
import ActiveFriendsList from "./ActiveFriendsList/ActiveFriendsList";

export default function FriendsManagementMain(props) {
  const conversations = useContext(ConversationContext);
  const user = useContext(UserContext);

  const { statusState } = props;

  const friends = [];

  if (
    statusState.currentStatus === "ONLINE" ||
    statusState.currentStatus === "ALL"
  ) {
    conversations?.forEach((conversation) => {
      const friend = conversation.members.find(
        (member) => member._id !== user.id
      );
      friends.push({ user: friend, conversationId: conversation._id });
    });
  }

  return (
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
            {statusState?.currentStatus} - {friends?.length}
          </h5>
        </div>
      </div>
      <div className={styles.activeFriendsOuterContainer}>
        {(statusState.currentStatus === "ONLINE" ||
          statusState.currentStatus === "ALL") &&
          friends.map((friend) => <ActiveFriendsList friend={friend} />)}
      </div>
    </div>
  );
}
