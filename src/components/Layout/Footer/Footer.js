import React from "react";
import { HashLink } from "react-router-hash-link";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="flex-center">
        <ul className={classes["footer__nav"]}>
          <li>
            <HashLink to="#" className="active">
              About Us
            </HashLink>
          </li>

          <li>
            <HashLink to="#" className="active">
              Contact
            </HashLink>
          </li>
        </ul>
      </div>
      <p
        className={`${classes["footer-copyright"]} p-opensans`}
        style={{ color: "var(--color-white)" }}
      >
        &copy; Brunel Johnson. All rights reserved 2022.
      </p>
    </footer>
  );
};

export default Footer;
