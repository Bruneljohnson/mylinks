import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-Http";
import useInput from "../../../hooks/use-input";
import { ErrorSliceActions } from "../../../store/slices/errorSlice/ErrorSlice";
import { UserDataActions } from "../../../store/slices/userDataSlice/UserDataSlice";
import MyLinkItem from "./MyLinkItem";
import Input from "../../Ui/Input";
import LoadingSpinner from "../../Ui/LoadingSpinner";
import classes from "./Mylinks.module.css";
import Alerts from "../../Ui/Alerts";

const MyTop5Links = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.data.user);
  const top5Links = useSelector((state) => state.data.top5);

  const { error, isLoading, sendRequest } = useHttp();

  /* FETCH (GET) REQUEST FOR TOP 5 LINKS   */
  useEffect(() => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/myurl/mytop5",
      headers: { Authorization: `Bearer ${token}` },
    };
    const dataGrabber = (data) => {
      dispatch(UserDataActions.storeTop5(data));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [token, sendRequest, dispatch]);

  const MyTop5Links = top5Links?.data?.map((mylink) => (
    <MyLinkItem
      key={mylink._id}
      fullUrl={mylink.fullUrl}
      shortUrl={mylink.shortUrl}
      visits={mylink.visits}
    />
  )) ?? <MyLinkItem />;

  /* STORING AND VALIDATING FORM INPUT WITH CUSTOM INPUT HOOK */
  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    inputHandler,
    blurHandler,
    clear,
  } = useInput((value) => value.toLowerCase().trim().length === 7);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredUrlIsValid) {
      setFormIsValid(true);
    }
  }, [enteredUrlIsValid]);

  /* FETCH (DELETE) CALL FOR MYLINKS */
  const deleteMyLinkHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const mylink = enteredUrl.toLowerCase();

    const requestConfig = {
      url: `https://mylinks-url.herokuapp.com/api/v1/myurl/${mylink}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      /* FOR SUCCESSFUL REQUEST */
      setDeleteComplete(true);
      setTimeout(() => {
        setDeleteComplete(false);
        navigate("/", { replace: true });
      }, 2000);
    };

    sendRequest(requestConfig, dataGrabber);
    clear();
  };

  /* ERROR HANDLING FOR FETCH REQUESTS */
  useEffect(() => {
    if (error) {
      dispatch(ErrorSliceActions.error(true));
    }
  }, [error, dispatch]);

  return (
    <React.Fragment>
      {deleteComplete && <Alerts type="success" msg="MyLink Deleted!" />}
      <div className={classes["user-view__form-container"]}>
        <div className={classes["profile-details"]}>
          <div
            className={`${classes["form__group"]} ${classes["form__photo-upload"]}`}
          >
            <img
              className={classes["form__user-photo"]}
              src={`
              https://mylinks-url.herokuapp.com/api/v1/users/images/${user?.photo}`}
              alt={user.name}
            />
          </div>
          <h2 className={`${classes["heading-secondary"]}`}>{user.name}</h2>
          <div className={classes["flex-center"]}>
            <p className="p-opensans ma-bt-md" style={{ marginRight: "5rem" }}>
              Visits{" "}
              <strong style={{ color: "var(--color-blue)" }}>
                {user.totalUrlVisits}
              </strong>
            </p>
            <p className="p-opensans ma-bt-md">
              Links{" "}
              <strong style={{ color: "var(--color-blue)" }}>
                {user?.mylinks?.length}
              </strong>
            </p>
          </div>
        </div>
      </div>

      <div className="line">&nbsp;</div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes["user-view__form-container"]}>
          <section className={`flex-column ma-bt-lg`}>
            <h2 className={`${classes["heading-secondary"]} `}>
              My Top 5 Links
            </h2>
            <ul>{MyTop5Links}</ul>
          </section>
        </div>
      )}
      <div className="line">&nbsp;</div>
      <div className={classes["user-view__form-container"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Delete MyLink
        </h2>
        <form
          onSubmit={deleteMyLinkHandler}
          className={`${classes.form} ${classes["form-user-settings"]}`}
        >
          <Input
            label="MyLink"
            id="delete"
            type="text"
            placeholder="aaa5fe4"
            value={enteredUrl}
            onBlur={blurHandler}
            onChange={inputHandler}
          />

          <div className={`${classes["form__group"]} right`}>
            <button className="custom-button" type="submit">
              Delete Mylink
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyTop5Links;
