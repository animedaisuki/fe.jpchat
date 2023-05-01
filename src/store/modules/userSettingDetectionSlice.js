import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNeedUpdate: false,
  primaryColorChanged: false,
  accentColorChanged: false,
  aboutMeChanged: false,
};

const userSettingDetectionSlice = createSlice({
  name: "user setting detection",
  initialState,
  reducers: {
    detectPrimaryColorChange(state) {
      state.isNeedUpdate = true;
      state.primaryColorChanged = true;
    },
    detectAccentColorChange(state) {
      state.isNeedUpdate = true;
      state.accentColorChanged = true;
    },
    detectAboutMeChange(state) {
      state.isNeedUpdate = true;
      state.aboutMeChanged = true;
    },
    resetAllDetection(state) {
      state.isNeedUpdate = false;
      state.primaryColorChanged = false;
      state.accentColorChanged = false;
      state.aboutMeChanged = false;
    },
    resetAboutMeDetection(state) {
      state.aboutMeChanged = false;
      if (!state.primaryColorChanged && !state.accentColorChanged) {
        state.isNeedUpdate = false;
      }
    },
  },
});

export default userSettingDetectionSlice.reducer;
export const userSettingDetectionActions = userSettingDetectionSlice.actions;
