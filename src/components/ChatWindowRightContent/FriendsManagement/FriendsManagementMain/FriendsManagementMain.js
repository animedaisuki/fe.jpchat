import React, { useContext, useState } from "react";
import styles from "./FriendsManagementMain.module.scss";
import { FiSearch } from "react-icons/fi";
import ActiveFriendsList from "./ActiveFriendsList/ActiveFriendsList";
import { v4 as uuid } from "uuid";
import { addFriend } from "../../../../api/user/user";
import { SocketContext } from "../../../../context/SocketRefProvider";
import { UserContext } from "../../../../context/UserInfoProvider";
import { useDispatch, useSelector } from "react-redux";
import { conversationActions } from "../../../../store/modules/conversationSlice";

export default function FriendsManagementMain(props) {
  const { statusState } = props;
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendsOfUser.normalFriends);

  const socket = useContext(SocketContext);

  const onlineFriends = friends?.filter((friend) => friend.isOnline === true);

  const [receiverUsername, setReceiverUsername] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handeRequestFriend = async () => {
    const token = localStorage.getItem("access_token");
    setIsFetching(true);
    const result = await addFriend(token, { receiverUsername });
    if (!result.error) {
      const newConversation = result.data.populatedNewConversation;
      // setConversations((prevState) => [...prevState, newConversation]);
      dispatch(conversationActions.addNewConversation(newConversation));
      socket.current?.emit("addConversation", {
        senderId: user._id,
        receiverId: result.data.receiverId,
        newConversation,
      });
    }
    setIsFetching(false);
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
              className={`${styles.addFriendButton} ${
                isFetching ? styles.disabled : undefined
              }`}
              onClick={handeRequestFriend}
              disabled={isFetching}
            >
              Send Friend Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
