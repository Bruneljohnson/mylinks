import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedId = localStorage.getItem("id");
const initialToken = storedToken ?? null;
const initialId = storedId ?? null;

const initialAuthState = {
  isAuth: !!initialToken,
  token: initialToken,
  id: initialId,
}; // isAuth: !

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuth = true;
    },
    id(state, action) {
      state.id = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.token = ``;
      state.id = null;
    },
  },
});

export const AuthSliceActions = AuthSlice.actions;

export default AuthSlice.reducer;
