import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNeedUpdate: false,
  avatarChanged: false,
  primaryColorChanged: false,
  accentColorChanged: false,
  aboutMeChanged: false,
};

const userSettingDetectionSlice = createSlice({
  name: "user setting detection",
  initialState,
  reducers: {
    detectAvatarChange(state) {
      state.isNeedUpdate = true;
      state.avatarChanged = true;
    },
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
      state.avatarChanged = false;
      state.primaryColorChanged = false;
      state.accentColorChanged = false;
      state.aboutMeChanged = false;
    },
    resetAboutMeDetection(state) {
      state.aboutMeChanged = false;
      if (
        !state.avatarChanged &&
        !state.primaryColorChanged &&
        !state.accentColorChanged
      ) {
        state.isNeedUpdate = false;
      }
    },
  },
});

export default userSettingDetectionSlice.reducer;
export const userSettingDetectionActions = userSettingDetectionSlice.actions;
