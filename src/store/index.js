import { configureStore } from "@reduxjs/toolkit";
import currentFriendReducer from "./modules/currentFriendSlice";
import friendIsCallingReducer from "./modules/friendIsCallingSlice";
import friendsOfUserReducer from "./modules/friendsOfUserSlice";
import conversationReducer from "./modules/conversationSlice";

const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    currentFriend: currentFriendReducer,
    friendIsCalling: friendIsCallingReducer,
    friendsOfUser: friendsOfUserReducer,
  },
});

export default store;
