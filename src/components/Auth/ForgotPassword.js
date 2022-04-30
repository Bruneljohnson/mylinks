import React, { useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import Input from "../Ui/Input";
import classes from "./Auth.module.css";

const ForgotPassword = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  /* REGEX USED TO VERIFY INPUTTED EMAIL AND USE OF CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    inputHandler: emailInputHandler,
    blurHandler: blurEmailHandler,
    clear: clearEmail,
  } = useInput((value) => value.toLowerCase().match(re) !== []);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredEmailIsValid) {
      setFormIsValid(true);
    }
  }, [enteredEmailIsValid]);

  /* FORM SUBMIT HANDLER (LIFTING STATE UP) */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = {
      email: enteredEmail,
    };
    props.onForgotPassword(data);
    clearEmail();
  };

  return (
    <section className="section-padding ">
      <div className={classes["signup-form"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Forgot Password
        </h2>
        <form
          onSubmit={formSubmitHandler}
          className={`${classes.form} ${classes["form-user-data"]}`}
        >
          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="johndoe@mailsac.com"
            value={enteredEmail}
            onBlur={blurEmailHandler}
            onChange={emailInputHandler}
          />
          <div className={`${classes["form__group"]}`}>
            <button className="custom-button" type="submit">
              Send Reset Token
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
