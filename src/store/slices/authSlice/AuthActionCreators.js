import { AuthSliceActions } from "./AuthSlice";

let logoutTimer;

export const storeToken = (token, id) => {
  return async (dispatch) => {
    localStorage.setItem(`token`, token);
    localStorage.setItem("id", id);

    logoutTimer = setTimeout(() => {
      dispatch(AuthSliceActions.logout());
      dispatch(clearToken());
    }, 1800000);
  };
};

export const clearToken = () => {
  return async (dispatch) => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`id`);

    logoutTimer && clearTimeout(logoutTimer);
  };
};
