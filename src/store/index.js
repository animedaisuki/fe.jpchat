import { configureStore } from "@reduxjs/toolkit";
import currentFriendReducer from "./modules/currentFriendSlice";
import friendIsCallingReducer from "./modules/friendIsCallingSlice";
import friendsOfUserReducer from "./modules/friendsOfUserSlice";

const store = configureStore({
  reducer: {
    currentFriend: currentFriendReducer,
    friendIsCalling: friendIsCallingReducer,
    friendsOfUser: friendsOfUserReducer,
  },
});

export default store;
