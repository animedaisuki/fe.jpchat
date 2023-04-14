import { configureStore } from "@reduxjs/toolkit";
import currentFriendReducer from "./modules/currentFriendSlice";

const store = configureStore({
  reducer: { currentFriend: currentFriendReducer },
});

export default store;
