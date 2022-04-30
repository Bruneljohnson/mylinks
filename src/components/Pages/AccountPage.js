import React, { useEffect, useState } from "react";
import AccountUserInfo from "../Account/AccountUserInfo";
import AccountUserNav from "../Account/AccountUserNav";
import classes from "../Account/AccountUserNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ErrorSliceActions } from "../../store/slices/errorSlice/ErrorSlice";
import Alerts from "../Ui/Alerts";

const AccountPage = () => {
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);
  const user = useSelector((state) => state.data.user);
  const token = useSelector((state) => state.auth.token);
  const hasError = useSelector((state) => state.error.hasError);

  /* SETS SIDE BAR MENU TO THE ADMIN SECTION IF USER ROLE IS ADMIN */
  useEffect(() => {
    if (user?.role === "admin") {
      setToggleState(4);
    }
  }, [user]);

  /* TAB INDEX TOGGLER */
  const toggleTabHandler = (index) => {
    setToggleState(index);
  };

  /* ERROR HANDLING FOR HTTP REQUEST FOR ACCOUNTPAGE COMPONENTS */
  useEffect(() => {
    let errorTimer;
    if (hasError) {
      errorTimer = setTimeout(() => {
        dispatch(ErrorSliceActions.error(false));
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [hasError, dispatch]);

  return (
    <React.Fragment>
      {hasError && (
        <Alerts
          type="error"
          msg={token ? "Request Failed." : "Unauthorised Access."}
        />
      )}
      <section className="section-padding">
        <div className={classes["user-view"]}>
          <AccountUserNav onToggle={toggleTabHandler} state={toggleState} />
          <AccountUserInfo state={toggleState} />
        </div>
      </section>
    </React.Fragment>
  );
};

export default AccountPage;
