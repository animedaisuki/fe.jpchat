import { configureStore } from "@reduxjs/toolkit";
import currentFriendReducer from "./modules/currentFriendSlice";
import friendIsCallingReducer from "./modules/friendIsCallingSlice";

const store = configureStore({
  reducer: {
    currentFriend: currentFriendReducer,
    friendIsCalling: friendIsCallingReducer,
  },
});

export default store;
