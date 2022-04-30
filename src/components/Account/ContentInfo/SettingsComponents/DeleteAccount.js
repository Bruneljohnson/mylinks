import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../../hooks/use-Http";
import { ErrorSliceActions } from "../../../../store/slices/errorSlice/ErrorSlice";
import { UserDataActions } from "../../../../store/slices/userDataSlice/UserDataSlice";
import { AuthSliceActions } from "../../../../store/slices/authSlice/AuthSlice";
import { clearToken } from "../../../../store/slices/authSlice/AuthActionCreators";
import { clearData } from "../../../../store/slices/userDataSlice/UserDataActionCreators";

import classes from "../../AccountUserInfo.module.css";
import Alerts from "../../../Ui/Alerts";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteComplete, setDeleteComplete] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const { error, sendRequest } = useHttp();

  /* FETCH (DELETE) CALL TO DELETE USER ACCOUNT */
  const deleteMeHandler = (event) => {
    event.preventDefault();

    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/users/deleteMe",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const dataGrabber = (data) => {
      /* FOR SUCCESSFUL REQUEST */
      setDeleteComplete(true);
      setTimeout(() => {
        setDeleteComplete(false);
      }, 2000);
    };

    sendRequest(requestConfig, dataGrabber);

    dispatch(AuthSliceActions.logout());
    dispatch(UserDataActions.remove());
    dispatch(ErrorSliceActions.error(false));
    dispatch(clearToken());
    dispatch(clearData());
    navigate(`/`, { replace: true });
  };

  /* ERROR HANDLING FOR FETCH REQUESTS */
  useEffect(() => {
    if (error) {
      dispatch(ErrorSliceActions.error(true));
    }
  }, [error, dispatch]);

  return (
    <React.Fragment>
      {deleteComplete && <Alerts type="success" msg="Account Deleted!" />}
      <div className={classes["user-view__form-container"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Delete Your Account
        </h2>
        <form
          onSubmit={deleteMeHandler}
          className={`${classes.form} ${classes["form-user-settings"]}`}
        >
          <div className={`${classes["form__group"]} right`}>
            <button className="custom-button" type="submit">
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default DeleteAccount;
