import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthSliceActions } from "../../../store/slices/authSlice/AuthSlice";
import { clearToken } from "../../../store/slices/authSlice/AuthActionCreators";
import classes from "./AuthNavLinks.module.css";

import { UserDataActions } from "../../../store/slices/userDataSlice/UserDataSlice";
import { clearData } from "../../../store/slices/userDataSlice/UserDataActionCreators";
import { ErrorSliceActions } from "../../../store/slices/errorSlice/ErrorSlice";

const AuthNavLinks = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.id);
  const user = useSelector((state) => state.data.user);

  /* LOG OUT HANDLER TO CLEAR USERS LOCAL STORAGE AND STATE */
  const logoutHandler = () => {
    dispatch(AuthSliceActions.logout());
    dispatch(UserDataActions.remove());
    dispatch(ErrorSliceActions.error(false));
    dispatch(clearToken());
    dispatch(clearData());
    navigate(`/`, { replace: true });
    props.onToggle();
  };

  return (
    <React.Fragment>
      <li className={`p-opensans ${classes.li}`}>
        <NavLink
          to={`/user/${id}`}
          onClick={props.onToggle}
          className={(navData) => (navData.isActive ? classes.active : ``)}
        >
          <div className="flex-center">
            <span className={classes.name}>{user?.name?.split(" ")[0]}</span>
            <img
              className={classes["nav__user-img"]}
              src={`
                https://mylinks-url.herokuapp.com/${user?.photo}`}
              alt={user?.name}
            />
          </div>
        </NavLink>
      </li>
      <li className="p-opensans">
        <button onClick={logoutHandler} className={classes[`logout-button`]}>
          Logout
        </button>
      </li>
    </React.Fragment>
  );
};
export default AuthNavLinks;
