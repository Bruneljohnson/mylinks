import { UserDataActions } from "./UserDataSlice";

let logoutTimer;

export const getStoredUserData = () => {
  const storedUserData = localStorage.getItem(`UserData`);
  return { userData: JSON.parse(storedUserData) };
};
export const storeData = (data) => {
  return async (dispatch) => {
    localStorage.setItem(`UserData`, JSON.stringify(data));

    logoutTimer = setTimeout(() => {
      dispatch(clearData());
      dispatch(UserDataActions.remove());
    }, 300000);
  };
};

export const clearData = () => {
  return async (dispatch) => {
    localStorage.removeItem(`UserData`);

    logoutTimer && clearTimeout(logoutTimer);
  };
};
