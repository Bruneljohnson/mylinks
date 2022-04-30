import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-Http";
import { storeToken } from "../../store/slices/authSlice/AuthActionCreators";
import { AuthSliceActions } from "../../store/slices/authSlice/AuthSlice";
import Signup from "../Auth/Signup";
import Alerts from "../Ui/Alerts";

const SignupPage = () => {
  const [hasError, setHasError] = useState(false);
  const [LoggingIn, setLoggingIn] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, sendRequest } = useHttp();

  /* TAB STATE FUNCTION */
  const completeFormStepsHandler = () => {
    setFormStep((prev) => prev + 1);
  };

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
      setFormStep(0);
    };
  }, [error]);

  /* FETCH (POST) REQUEST FOR SIGNING UP USERS */
  const signUpHandler = (data) => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/users/signup",
      method: "POST",
      body: data,
      headers: {
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
      {LoggingIn && (
        <Alerts type="success" msg="Account Creation Successful!" />
      )}
      {hasError && <Alerts type="error" msg="Email Already Exists!" />}
      <Signup
        onSignUp={signUpHandler}
        loggingIn={LoggingIn}
        formStep={formStep}
        onFormSteps={completeFormStepsHandler}
      />
    </React.Fragment>
  );
};

export default SignupPage;
