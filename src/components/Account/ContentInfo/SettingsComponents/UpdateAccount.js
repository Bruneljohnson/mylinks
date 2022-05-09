import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../../../../hooks/use-input";
import { ErrorSliceActions } from "../../../../store/slices/errorSlice/ErrorSlice";

import Input from "../../../Ui/Input";
import classes from "../../AccountUserInfo.module.css";
import Alerts from "../../../Ui/Alerts";

const UpdateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountUpdated, setAccountUpdated] = useState(false);
  const user = useSelector((state) => state.data.user);
  const token = useSelector((state) => state.auth.token);

  /* REGEX USED TO VERIFY INPUTTED EMAIL AND USE OF CUSTOM INPUT HOOKS TO CAPTURE DATA */
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    clear: clearName,
  } = useInput(
    (value) => value.toLowerCase().trim() !== `` && value.trim().includes(` `)
  );
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    clear: clearEmail,
  } = useInput((value) => value.toLowerCase().match(re) !== []);

  /* FILE SELECTOR HANDLER FOR FORMDATA */
  const fileSelectHandler = (event) => {
    event.preventDefault();

    setSelectedFile(event.target.files[0]);
  };

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredEmailIsValid || enteredNameIsValid || selectedFile) {
      setFormIsValid(true);
    }
  }, [enteredEmailIsValid, enteredNameIsValid, selectedFile]);

  /* AXIOS PATCH REQUEST TO UPADTE USER DETAILS VIA FORMDATA */
  const updateDetailsHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const form = new FormData();
    form.append("photo", selectedFile);
    form.append("email", enteredEmail);
    form.append("name", enteredName);

    axios
      .patch("https://mylinks-url.herokuapp.com/api/v1/users/updateMe", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res) {
          setAccountUpdated(true);
          setTimeout(() => {
            setAccountUpdated(false);
            navigate(`/`, { replace: true });
          }, 2000);
        }
      })
      .catch((e) => {
        dispatch(ErrorSliceActions.error(true));
      });

    clearEmail();
    clearName();
    setSelectedFile(null);
  };

  return (
    <React.Fragment>
      {accountUpdated && (
        <Alerts type="success" msg="Your Account Has Been Updated!" />
      )}
      <div className={classes["user-view__form-container"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Your account settings
        </h2>
        <form
          onSubmit={updateDetailsHandler}
          className={`${classes.form} ${classes["form-user-data"]}`}
        >
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder={user?.name?.toUpperCase()}
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameInputHandler}
          />

          <Input
            label="Email Address"
            id="email"
            className="ma-bt-md"
            type="email"
            placeholder={user?.email?.toUpperCase()}
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailInputHandler}
          />

          <div
            className={`${classes["form__group"]} ${classes["form__photo-upload"]}`}
          >
            <img
              className={classes["form__user-photo"]}
              src={`
              https://mylinks-url.herokuapp.com/api/v1/users/images/${user?.photo}`}
              alt={user.name}
            />

            <input
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              className={classes["form__upload"]}
              onChange={fileSelectHandler}
            />
            <label className={classes["form__label"]} htmlFor="photo">
              Choose new photo
            </label>
          </div>
          <div className={`${classes["form__group"]} right`}>
            <button className="custom-button" type="submit">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UpdateAccount;
