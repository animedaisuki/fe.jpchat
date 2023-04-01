import React, { useContext, useEffect, useState } from "react";
import styles from "./ChatFriendsSideBar.module.scss";
import { FaUserFriends } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import ChatFriendView from "./ChatFriendView/ChatFriendView";
import { UserContext } from "../../../context/UserInfoProvider";
import { getConversation } from "../../../api/conversation/conversation";

export default function ChatFriendsSideBar() {
  const user = useContext(UserContext);
  const [conversations, setConversations] = useState(null);

  // const friendZura = {
  //   id: "21f307a2-b840-414e-9f2b-9f070979ba63",
  //   username: "ZuraHararara",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-ayaka-small.png",
  // };
  // const friendTsu = {
  //   id: uuid(),
  //   username: "TsuyokuYoshiko",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-nahida-small.png",
  // };
  // const friendHosoya = {
  //   id: uuid(),
  //   username: "Hosoya",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-shogun-samll.png",
  // };
  // const friendZiqi = {
  //   id: uuid(),
  //   username: "Ziqi",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-kujou-small.png",
  // };
  // const friendDavid = {
  //   id: uuid(),
  //   username: "David",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-shogun-samll.png",
  // };
  // const friendZijun = {
  //   id: uuid(),
  //   username: "Zijun",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-yoimiya-small.png",
  // };
  // const friendJC = {
  //   id: uuid(),
  //   username: "JC",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-nahida-small.png",
  // };
  // const friendJason = {
  //   id: uuid(),
  //   username: "Jason",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-ayaka-small.png",
  // };
  // const friendJoe = {
  //   id: uuid(),
  //   username: "Joe",
  //   avatar:
  //     "https://amahane.s3.ap-northeast-1.amazonaws.com/users/defaultAvatar/char-shogun-samll.png",
  // };
  // const friends = [
  //   friendZura,
  //   friendTsu,
  //   friendHosoya,
  //   friendZiqi,
  //   friendDavid,
  //   friendZijun,
  //   friendJC,
  //   friendJason,
  //   friendJoe,
  // ];

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await getConversation(user?.id);
      setConversations(result.data);
    };
    fetchConversations();
  }, [user]);

  // useEffect(() => {
  //   console.log(conversations);
  // }, [conversations]);

  return (
    <div className={styles.chatWindowLeftFunctionBarFriendsContainer}>
      <div className={styles.chatWindowLeftFunctionBarFriendsBtnContainer}>
        <div className={styles.chatWindowLeftFunctionBarFriendsBtn}>
          <div
            className={styles.chatWindowLeftFunctionBarFriendsBtnIconContainer}
          >
            <FaUserFriends size={30} />
          </div>
          <p className={styles.chatWindowLeftFunctionBarFriendsBtnDesc}>
            Friends
          </p>
        </div>
      </div>
      <div className={styles.chatWindowLeftFunctionBarDMSplitContainer}>
        <p className={styles.chatWindowLeftFunctionBarDMDesc}>
          DIRECT MESSAGES
        </p>
        <div className={styles.chatWindowLeftFunctionBarDMSplitIconContainer}>
          <BiPlus className={styles.chatWindowLeftFunctionBarDMSplitIcon} />
        </div>
      </div>
      {conversations?.map((conversation) => (
        <ChatFriendView key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
