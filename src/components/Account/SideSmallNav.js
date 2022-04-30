import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./AccountUserNav.module.css";
import { BsLink45Deg } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { VscSettingsGear } from "react-icons/vsc";
import { ImDatabase } from "react-icons/im";
import { useSelector } from "react-redux";

const SideSmallNav = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const id = useSelector((state) => state.auth.id);
  const user = useSelector((state) => state.data.user);

  return (
    <React.Fragment>
      {user?.role !== "admin" && (
        <div className={classes["admin-nav"]}>
          <h5
            className={`${classes["admin-nav__heading"]} p-oswald`}
            style={{ color: "white" }}
          >
            Menu
          </h5>
          <ul className={`${classes["side-nav"]} p-opensans`}>
            <li
              className={props.state === 1 ? classes.active : ""}
              onClick={() => {
                props.onToggle(1);
                props.onSwitch();
              }}
            >
              <NavLink
                to={isAuth && `/user/${id}`}
                className={(navData) => (navData.isActive ? "active" : ``)}
              >
                <BsLink45Deg size={30} className={classes["react-icon"]} />
                MyLinks
              </NavLink>
            </li>
            <li
              className={props.state === 2 ? classes.active : ""}
              onClick={() => {
                props.onToggle(2);
                props.onSwitch();
              }}
            >
              <NavLink
                to={isAuth && `/user/${id}`}
                className={(navData) => (navData.isActive ? "active" : ``)}
              >
                <AiOutlineStar size={30} className={classes["react-icon"]} />
                My Top 5
              </NavLink>
            </li>
            <li
              className={props.state === 3 ? classes.active : ""}
              onClick={() => {
                props.onToggle(3);
                props.onSwitch();
              }}
            >
              <NavLink
                to={isAuth && `/user/${id}`}
                className={(navData) => (navData.isActive ? "active" : ``)}
              >
                <VscSettingsGear size={25} className={classes["react-icon"]} />
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {user?.role === "admin" && (
        <div className={classes["admin-nav"]}>
          <h5
            className={`${classes["admin-nav__heading"]} p-oswald`}
            style={{ color: "white" }}
          >
            Admin
          </h5>
          <ul className={`${classes["side-nav"]} p-opensans`}>
            <li
              className={props.state === 4 ? classes.active : ""}
              onClick={() => {
                props.onToggle(4);
                props.onSwitch();
              }}
            >
              <NavLink
                to={isAuth && `/user/${id}`}
                className={(navData) => (navData.isActive ? "active" : ``)}
              >
                <ImDatabase size={25} className={classes["react-icon"]} />
                MyLinksDB
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default SideSmallNav;
