import { createSlice } from "@reduxjs/toolkit";

const initialState = { normalFriends: [], AIFriends: [] };

const friendsOfUserSlice = createSlice({
  name: "friends of user",
  initialState,
  reducers: {
    setFriendsOfUser(state, action) {
      state.normalFriends = action.payload;
    },
    setAIFriendsOfUser(state, action) {
      state.AIFriends = action.payload;
    },
  },
});

export default friendsOfUserSlice.reducer;
export const friendsOfUserActions = friendsOfUserSlice.actions;
