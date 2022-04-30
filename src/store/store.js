import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/authSlice/AuthSlice";
import UserDataSliceReducer from "./slices/userDataSlice/UserDataSlice";
import ErrorSliceReducer from "./slices/errorSlice/ErrorSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    data: UserDataSliceReducer,
    error: ErrorSliceReducer,
  },
});
