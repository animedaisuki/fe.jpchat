import { configureStore } from "@reduxjs/toolkit";
import currentFriendReducer from "./modules/currentFriendSlice";
import friendIsCallingReducer from "./modules/friendIsCallingSlice";
import friendsOfUserReducer from "./modules/friendsOfUserSlice";
import conversationReducer from "./modules/conversationSlice";
import userSettingDetectionReducer from "./modules/userSettingDetectionSlice";

const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    currentFriend: currentFriendReducer,
    friendIsCalling: friendIsCallingReducer,
    friendsOfUser: friendsOfUserReducer,
    userSettingDetection: userSettingDetectionReducer,
  },
});

export default store;
