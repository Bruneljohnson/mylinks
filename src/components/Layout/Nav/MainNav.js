import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { images } from "../../../constants/images";
import classes from "./MainNav.module.css";
import AuthNavLinks from "./AuthNavLinks";

const MainNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const toggleHandler = () => {
    setToggleMenu((prevState) => !prevState);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarLogo}>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? classes.active : ``)}
        >
          <img src={images.mylinksLogo} alt="mylinks logo" />
        </NavLink>
      </div>

      <ul className={classes.navbarLinks}>
        {isAuth && <AuthNavLinks onToggle={toggleHandler} />}
      </ul>

      <div className={classes[`navbar-login`]}>
        {!isAuth && (
          <NavLink
            to="/login"
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Login
          </NavLink>
        )}
        {!isAuth && <div />}
        {!isAuth && (
          <NavLink
            to="/signup"
            className={(navData) => (navData.isActive ? classes.active : ``)}
          >
            Sign Up
          </NavLink>
        )}
      </div>

      <div className={classes[`navbar-smallscreen`]}>
        <div className={classes["navbar-smallscreen-icons"]}>
          {!toggleMenu && (
            <GiHamburgerMenu
              style={{ cursor: `pointer` }}
              color="#2b5592"
              fontSize={30}
              onClick={toggleHandler}
            />
          )}
        </div>

        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={toggleMenu}
          timeout={500}
          classNames={{
            enter: ``,
            enterActive: `slide-bottom`,
            exit: ``,
            exitActive: `slide-out`,
          }}
        >
          <div className={classes["navbar-smallscreen-overlay"]}>
            <MdOutlineClose
              fontSize={30}
              color="#2b5592"
              className={classes["overlay-close"]}
              onClick={toggleHandler}
            />
            <ul className={classes[`navbar-smallscreen-links`]}>
              {isAuth && <AuthNavLinks onToggle={toggleHandler} />}
              <br />
            </ul>
            <div className={classes[`navbar-smallscreen-login`]}>
              {!isAuth && (
                <NavLink
                  onClick={toggleHandler}
                  to="/login"
                  className={(navData) =>
                    navData.isActive ? classes.active : ``
                  }
                >
                  Login
                </NavLink>
              )}
              {!isAuth && <div />}
              {!isAuth && (
                <NavLink
                  onClick={toggleHandler}
                  to="/signup"
                  className={(navData) =>
                    navData.isActive ? classes.active : ``
                  }
                >
                  Sign Up
                </NavLink>
              )}
            </div>
          </div>
        </CSSTransition>
      </div>
    </nav>
  );
};

export default MainNav;
