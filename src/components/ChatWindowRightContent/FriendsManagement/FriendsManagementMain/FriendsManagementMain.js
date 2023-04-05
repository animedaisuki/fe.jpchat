import React, { useContext, useEffect, useState } from "react";
import styles from "./FriendsManagementMain.module.scss";
import { FiSearch } from "react-icons/fi";
import ActiveFriendsList from "./ActiveFriendsList/ActiveFriendsList";
import { v4 as uuid } from "uuid";
import { addFriend } from "../../../../api/user/user";
import { ConversationDispatchContext } from "../../../../context/ConversationProvider";
import { FriendsOfUserContext } from "../../../../context/FriendsOfUserProvider";
import { SocketContext } from "../../../../context/SocketRefProvider";
import { UserContext } from "../../../../context/UserInfoProvider";

export default function FriendsManagementMain(props) {
  const { statusState } = props;
  const user = useContext(UserContext);
  const friends = useContext(FriendsOfUserContext);
  const setConversations = useContext(ConversationDispatchContext);
  const socket = useContext(SocketContext);

  const onlineFriends = friends?.filter((friend) => friend.isOnline === true);

  const [receiverUsername, setReceiverUsername] = useState("");

  const handeRequestFriend = async () => {
    const token = localStorage.getItem("access_token");
    const result = await addFriend(token, { receiverUsername });
    if (!result.error) {
      const newConversation = result.data.populatedNewConversation;
      setConversations((prevState) => [...prevState, newConversation]);
      socket.current?.emit("addConversation", {
        senderId: user._id,
        receiverId: result.data.receiverId,
        newConversation,
      });
    }
  };

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
              onChange={(e) => {
                setReceiverUsername(e.target.value);
              }}
              type="text"
              placeholder="Enter a Username"
            />
            <button
              className={styles.addFriendButton}
              onClick={handeRequestFriend}
            >
              Send Friend Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
