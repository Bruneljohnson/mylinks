import React from "react";
import classes from "../Auth/Auth.module.css";

const Alerts = (props) => {
  const { type, msg } = props;
  return (
    <div className={`${classes.alert} ${classes[`alert--${type}`]}`}>{msg}</div>
  );
};

export default Alerts;
