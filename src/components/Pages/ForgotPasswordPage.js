import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-Http";
import ForgotPassword from "../Auth/ForgotPassword";
import Alerts from "../Ui/Alerts";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const { error, sendRequest } = useHttp();

  /* HTTP REQUEST ERROR HANDLING */
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

  /* FETCH (POST) REQUEST TO RESET PASSWORD */
  const forgotPasswordHandler = (data) => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/users/forgotPassword",
      method: "POST",
      body: data,
      headers: {
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      if (data) {
        setSendingEmail(true);

        setTimeout(() => {
          navigate(`/`, { replace: true });
          setSendingEmail(false);
        }, 2000);
      }
    };

    sendRequest(requestConfig, dataGrabber);
  };

  return (
    <React.Fragment>
      {sendingEmail && (
        <Alerts type="success" msg="Email Sent! Please Check Your Email." />
      )}
      {hasError && (
        <Alerts type="error" msg="Incorrect Email or Email Doesn't Exist." />
      )}
      <ForgotPassword
        onForgotPassword={forgotPasswordHandler}
        sendingEmail={sendingEmail}
      />
    </React.Fragment>
  );
};

export default ForgotPasswordPage;
