import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-Http";
import ResetPassword from "../Auth/ResetPassword";
import Alerts from "../Ui/Alerts";

const ResetPasswordPage = () => {
  const [hasError, setHasError] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const navigate = useNavigate();
  const { error, sendRequest } = useHttp();

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

  /* FECTH (PATCH) REQUEST TO RESET PASSWORD USING RESET TOKEN */
  const resetPasswordHandler = (data) => {
    const requestConfig = {
      url: `https://mylinks-url.herokuapp.com/api/v1/users/resetPassword/${data.resetToken}`,
      method: "PATCH",
      body: { password: data.password, passwordConfirm: data.passwordConfirm },
      headers: {
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      if (data) {
        setResettingPassword(true);
        setTimeout(() => {
          setResettingPassword(false);
          navigate(`/login`, { replace: true });
        }, 2000);
      }
    };

    sendRequest(requestConfig, dataGrabber);
  };

  return (
    <React.Fragment>
      {resettingPassword && (
        <Alerts type="success" msg="Password Updated! Please Log In" />
      )}
      {hasError && <Alerts type="error" msg="Reset Token Has Expired!" />}
      <ResetPassword onResetPassword={resetPasswordHandler} />
    </React.Fragment>
  );
};

export default ResetPasswordPage;
