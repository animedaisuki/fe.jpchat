import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detail: null,
  isOnline: false,
};

const currentFriendSlice = createSlice({
  name: "currentFriend",
  initialState,
  reducers: {
    setCurrentFriend(state, action) {
      const currentFriend = action.payload;
      state.detail = currentFriend.detail;
      state.isOnline = currentFriend.isOnline;
    },
  },
});

export default currentFriendSlice.reducer;
export const currentFriendActions = currentFriendSlice.actions;
