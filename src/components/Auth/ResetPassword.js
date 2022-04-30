import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Input from "../Ui/Input";
import classes from "./Auth.module.css";

const ResetPassword = (props) => {
  const params = useParams();
  const [formIsValid, setFormIsValid] = useState(false);

  /* USE OF CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    inputHandler: passwordInputHandler,
    blurHandler: blurPasswordHandler,
    clear: clearPassword,
  } = useInput((value) => value.trim() !== `` && value.trim().length >= 8);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    inputHandler: confirmPasswordInputHandler,
    blurHandler: confirmPasswordBlurHandler,
    clear: clearConfirmPassword,
  } = useInput((value) => value === enteredPassword);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredPasswordIsValid && enteredConfirmPasswordIsValid) {
      setFormIsValid(true);
    }
  }, [enteredPasswordIsValid, enteredConfirmPasswordIsValid]);

  /* FORM SUBMIT HANDLER (LIFTING STATE UP) */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = {
      resetToken: params.token,
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
    };
    props.onResetPassword(data);
    clearPassword();
    clearConfirmPassword();
  };

  return (
    <section className="section-padding ">
      <div className={classes["signup-form"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Reset Password
        </h2>
        <form
          onSubmit={formSubmitHandler}
          className={`${classes.form} ${classes["form-user-data"]}`}
        >
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={enteredPassword}
            onBlur={blurPasswordHandler}
            onChange={passwordInputHandler}
          />
          <Input
            label="Confirm Password"
            id="password-confirm"
            type="password"
            placeholder="••••••••"
            value={enteredConfirmPassword}
            onBlur={confirmPasswordBlurHandler}
            onChange={confirmPasswordInputHandler}
          />
          <div className={`${classes["form__group"]}`}>
            <button className="custom-button" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
