import { createSlice } from "@reduxjs/toolkit";
import { getStoredUserData } from "./UserDataActionCreators.js";

const storedUserData = getStoredUserData();
const initialUserData = storedUserData?.userData ?? {
  fullUrl: "",
  shortUrl: "",
  visits: "",
};

const initialUserDataState = {
  userData: initialUserData,
  photo: "",
  user: [],
  links: [],
  top5: [],
  pageRender: false,
};

const UserDataSlice = createSlice({
  name: "data",
  initialState: initialUserDataState,
  reducers: {
    store(state, action) {
      state.userData = action.payload;
    },
    storePhoto(state, action) {
      state.photo = action.payload;
    },
    storeUser(state, action) {
      state.user = action.payload;
    },
    storeLinks(state, action) {
      state.links = action.payload;
    },
    storeTop5(state, action) {
      state.top5 = action.payload;
    },
    renderPage(state) {
      state.pageRender = !state.pageRender;
    },
    remove(state) {
      state.userData = {};
      state.photo = "";
      state.user = [];
      state.links = [];
      state.top5 = [];
      state.pageRender = false;
    },
  },
});

export const UserDataActions = UserDataSlice.actions;

export default UserDataSlice.reducer;
