import { createSlice } from "@reduxjs/toolkit";

const initialErrorState = {
  hasError: false,
  error: null,
};

const ErrorSlice = createSlice({
  name: "error",
  initialState: initialErrorState,
  reducers: {
    error(state, action) {
      state.hasError = action.payload;
    },
  },
});

export const ErrorSliceActions = ErrorSlice.actions;

export default ErrorSlice.reducer;
