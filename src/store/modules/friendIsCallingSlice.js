import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const friendIsCallingSlice = createSlice({
  name: "friend is calling",
  initialState,
  reducers: {
    setFriendIsCalling(state, action) {
      // 这里直接返回 action.payload 而不是修改 state
      // 因为 state 在这种情况下是一个基本类型（null 或一个对象）
      // 而不是一个复杂类型
      return action.payload;
    },
    clearFriendIsCalling() {
      return null;
    },
  },
});

export default friendIsCallingSlice.reducer;
export const friendIsCallingActions = friendIsCallingSlice.actions;
