import React, { useState } from "react";

import SideSmallNav from "./SideSmallNav";
import classes from "./AccountUserNav.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

const AccountUserNav = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleHandler = () => {
    setToggleMenu((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <nav className={classes["user-view__menu"]}>
        <SideSmallNav
          state={props.state}
          onSwitch={toggleHandler}
          onToggle={props.onToggle}
        />
      </nav>

      <div className={classes[`sidenav-smallscreen`]}>
        <div className={classes["sidenav-smallscreen-icons"]}>
          {!toggleMenu && (
            <AiOutlineDoubleRight
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
            enterActive: `slide-right`,
            exit: ``,
            exitActive: `slide-left`,
          }}
        >
          <div className={classes["sidenav-smallscreen-overlay"]}>
            <AiOutlineDoubleLeft
              fontSize={30}
              color="#fff"
              className={classes["overlay-close"]}
              onClick={toggleHandler}
            />

            <div className={classes[`sidenav-smallscreen-login`]}>
              <SideSmallNav
                state={props.state}
                onSwitch={toggleHandler}
                onToggle={props.onToggle}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    </React.Fragment>
  );
};

export default AccountUserNav;
