import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  normalConversations: [],
  AIConversations: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.normalConversations = action.payload;
    },
    addNewConversation(state, action) {
      const normalConversations = state.normalConversations;
      normalConversations.push(action.payload);
    },
    setAIConversations(state, action) {
      state.AIConversations = action.payload;
    },
  },
});

export default conversationSlice.reducer;
export const conversationActions = conversationSlice.actions;
