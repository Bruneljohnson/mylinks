import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Input from "../Ui/Input";
import classes from "./Auth.module.css";

const Login = (props) => {
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

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    inputHandler: passwordInputHandler,
    blurHandler: blurPasswordHandler,
    clear: clearPassword,
  } = useInput((value) => value.trim() !== `` && value.trim().length >= 8);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredEmailIsValid && enteredPasswordIsValid) {
      setFormIsValid(true);
    }
  }, [enteredEmailIsValid, enteredPasswordIsValid]);

  /* FORM SUBMIT HANDLER (LIFTING STATE UP) */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = { email: enteredEmail, password: enteredPassword };
    props.onLogin(data);
    clearEmail();
    clearPassword();
  };

  return (
    <section className="section-padding">
      <div className={classes["login-form"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Log into your account
        </h2>
        <div className={classes.alternative}>
          Not Registered?<Link to="/signup">Sign Up</Link>
        </div>
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

          <Input
            label="Password"
            id="password"
            type="password"
            className="ma-bt-md"
            placeholder="••••••••"
            value={enteredPassword}
            onBlur={blurPasswordHandler}
            onChange={passwordInputHandler}
          />

          <div className={`${classes["form__group"]}`}>
            <button className="custom-button">
              {props.loggingIn ? "Please Wait..." : "Login"}
            </button>
          </div>
        </form>
        <div className={classes.forgotpassword}>
          <Link to="/forgotpassword">Forgot Password</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
