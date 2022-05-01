import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Auth.module.css";
import Input from "../Ui/Input";
import useInput from "../../hooks/use-input";

const Signup = (props) => {
  const { formStep, onFormSteps, onGoBack } = props;
  const [formIsValid, setFormIsValid] = useState(false);

  /* REGEX USED TO VERIFY INPUTTED EMAIL AND USE OF CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    clear: clearName,
  } = useInput((value) => value.toLowerCase().trim().includes(` `));
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    inputHandler: emailInputHandler,
    blurHandler: blurEmailHandler,
    clear: clearEmail,
  } = useInput((value) => value.toLowerCase().match(re) !== []);

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
    if (
      enteredNameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
    ) {
      setFormIsValid(true);
    }
  }, [
    enteredEmailIsValid,
    enteredPasswordIsValid,
    enteredNameIsValid,
    enteredConfirmPasswordIsValid,
  ]);

  /* FORM SUBMIT HANDLER (LIFTING STATE UP) */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
    };
    props.onSignUp(data);
    clearEmail();
    clearPassword();
    clearName();
    clearConfirmPassword();
  };

  return (
    <section className="section-padding ">
      <div className={classes["signup-form"]}>
        {formStep <= 1 && (
          <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
            Create an account
          </h2>
        )}
        <div className={classes.alternative}>
          Already Registered?<Link to="/login">Log In</Link>
        </div>
        <form
          onSubmit={formSubmitHandler}
          className={`${classes.form} ${classes["form-user-data"]}`}
        >
          {formStep === 0 && (
            <section>
              <Input
                label="Name"
                id="name"
                type="text"
                placeholder="John Doe - Please Enter Full Name"
                value={enteredName}
                onBlur={nameBlurHandler}
                onChange={nameInputHandler}
              />
              <Input
                label="Email Address"
                id="email"
                type="email"
                placeholder="johndoe@mailsac.com"
                value={enteredEmail}
                onBlur={blurEmailHandler}
                onChange={emailInputHandler}
              />
            </section>
          )}
          {formStep === 1 && (
            <section>
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
            </section>
          )}
          {!enteredConfirmPasswordIsValid && (
            <div className={classes.invalid}>Passwords Don't Match</div>
          )}
          <div className={`${classes["form__group"]} ma-tp-md`}>
            {formStep !== 1 && (
              <button
                style={{ margin: "2rem 0" }}
                className="custom-button"
                type="button"
                onClick={onFormSteps}
              >
                Next Step
              </button>
            )}
            {formStep === 1 && (
              <button className="custom-button" type="sumbit">
                {props.loggingIn ? "Please Wait..." : "Create Account"}
              </button>
            )}
          </div>
        </form>
        {formStep === 1 && (
          <button
            type="button"
            onClick={onGoBack}
            className={classes.alternative}
            style={{ margin: "3rem 0" }}
          >
            GO BACK
          </button>
        )}
      </div>
    </section>
  );
};

export default Signup;
