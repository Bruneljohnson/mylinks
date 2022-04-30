import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-Http";
import { storeToken } from "../../store/slices/authSlice/AuthActionCreators";
import { AuthSliceActions } from "../../store/slices/authSlice/AuthSlice";
import Login from "../Auth/Login";
import Alerts from "../Ui/Alerts";

const LoginPage = () => {
  const [hasError, setHasError] = useState(false);
  const [LoggingIn, setLoggingIn] = useState(false);
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  /* ERROR HANDLING FOR FETCH REQUEST */
  useEffect(() => {
    let errorTimer;
    if (error) {
      setHasError(true);
      errorTimer = setTimeout(() => {
        setHasError(false);
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error]);
  /* FETCH (POST) REQUEST TO LOGIN TO ACCOUNT/APP */
  const loginHandler = (data) => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/users/login",
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      if (data) {
        setLoggingIn(true);

        const id = data.data;
        const token = data.token;

        setTimeout(() => {
          dispatch(AuthSliceActions.login(token));
          dispatch(AuthSliceActions.id(id));
          dispatch(storeToken(token, id));
          setLoggingIn(false);
          navigate(`/user/${id}`, { replace: true });
        }, 2000);
      }
    };

    sendRequest(requestConfig, dataGrabber);
  };

  return (
    <React.Fragment>
      {LoggingIn && <Alerts type="success" msg="Log in Successful!" />}
      {hasError && <Alerts type="error" msg="Wrong Email or Password." />}
      <Login onLogin={loginHandler} loggingIn={LoggingIn} />;
    </React.Fragment>
  );
};

export default LoginPage;
