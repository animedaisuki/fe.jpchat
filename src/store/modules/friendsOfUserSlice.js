import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const friendsOfUserSlice = createSlice({
  name: "friends of user",
  initialState,
  reducers: {
    setFriendsOfUser(state, action) {
      return action.payload;
    },
  },
});

export default friendsOfUserSlice.reducer;
export const friendsOfUserActions = friendsOfUserSlice.actions;
