import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { images } from "../../constants/images";
import { FaSearch } from "react-icons/fa";
import MyLinkItem from "../Account/ContentInfo/MyLinkItem";
import useInput from "../../hooks/use-input";
import { protocol } from "../../Helpers/Protocol";

const Header = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const userData = useSelector((state) => state.data.userData);

  /* REGEX USED TO VERIFY INPUTTED URL AND USE OF CUSTOM INPUT HOOK*/
  const re =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    inputHandler,
    blurHandler,
    clear,
  } = useInput((value) => value.toLowerCase().match(re));

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredUrlIsValid) {
      setFormIsValid(true);
    }
  }, [enteredUrlIsValid]);

  /* FORM SUBMIT HANDLER (LIFTING STATE UP) */
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = protocol(enteredUrl);

    props.onTester(data);
    clear();
  };

  return (
    <React.Fragment>
      <section className={`section-padding app-wrapper ${classes.header}`}>
        <div className="app-wrapper_info">
          <h3>Short Links, Big Results</h3>
          <p className="p-opensans">
            MyLinks is a URL Shortener API built with powerful tools to help you
            shorten your links and share them with the world.{" "}
            <strong style={{ color: "var(--color-blue)" }}>
              Try it out below!
            </strong>
          </p>
          <form onSubmit={formSubmitHandler} className={classes.shortbox}>
            <button className={classes.searchIcon} type="submit">
              <FaSearch size={30} />
            </button>
            <input
              type="text"
              placeholder="Enter Your Url Here..."
              onChange={inputHandler}
              onBlur={blurHandler}
              value={enteredUrl}
            />
          </form>
          <div className="line" style={{ margin: "3rem auto", width: "55%" }}>
            &nbsp;
          </div>
          <section
            className="flex-column"
            style={{ margin: "0 auto", width: "55%" }}
          >
            <h2
              className={`${classes["heading-secondary"]} ${classes["font-size"]}`}
              style={{ marginBottom: "1rem" }}
            >
              Your MyLink
            </h2>
            <ul>
              <MyLinkItem
                fullUrl={userData.fullUrl}
                shortUrl={userData.shortUrl}
                visits={userData.visits}
              />
            </ul>
          </section>
          <p
            className={`p-opensans ${classes.createAcc}`}
            style={{ fontSize: "1.3rem" }}
          >
            <Link to="/signup">Create an account</Link> to store, share and view
            your MyLinks.
          </p>
        </div>
        <figure style={{ marginBottom: "2rem" }} className="app-wrapper_img">
          <img src={images.headerImage} alt="header img" />
        </figure>
      </section>
    </React.Fragment>
  );
};

export default Header;
