import React from "react";
import classes from "./AccountUserInfo.module.css";
import Mylinks from "./ContentInfo/Mylinks";
import MylinksDB from "./ContentInfo/MylinksDB";
import MyTop5Links from "./ContentInfo/MyTop5Links";
import Settings from "./ContentInfo/Settings";

const AccountUserInfo = (props) => {
  return (
    <div className={`${classes["user-view__content"]} flex-column`}>
      {/* USED TO CREATE TABS THAT CONTAIN DIFFERENT COMPONENTS */}
      {props.state === 1 && <Mylinks />}
      {props.state === 2 && <MyTop5Links />}
      {props.state === 3 && <Settings />}
      {props.state === 4 && <MylinksDB />}
    </div>
  );
};

export default AccountUserInfo;
