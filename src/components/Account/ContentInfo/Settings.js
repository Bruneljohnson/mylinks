import React from "react";
import ChangePasswordForm from "./SettingsComponents/ChangePasswordForm";
import DeleteAccount from "./SettingsComponents/DeleteAccount";
import UpdateAccount from "./SettingsComponents/UpdateAccount";

const Settings = () => {
  return (
    <React.Fragment>
      <UpdateAccount />
      <div className="line"> &nbsp; </div>
      <ChangePasswordForm />
      <div className="line">&nbsp;</div>
      <DeleteAccount />
    </React.Fragment>
  );
};

export default Settings;
