import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../contants";
import localStorage from "redux-persist/es/storage";

const asynStore = async () => {
  const store = await localStorage.getItem(
    CONSTANTS,
  );
  return store;
}

const appSlice = createSlice({
  name: "user",
  initialState: {
    currentLang: 'vi',
  },
  reducers: {
    changeLang: (state, action) => {
      state.currentLang = action.payload;
    },
  },
});

export const { changeLang } = appSlice.actions;
export default appSlice.reducer;
