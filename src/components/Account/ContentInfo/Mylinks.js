import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../hooks/use-Http";
import useInput from "../../../hooks/use-input";
import { FaSearch } from "react-icons/fa";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { UserDataActions } from "../../../store/slices/userDataSlice/UserDataSlice";
import { ErrorSliceActions } from "../../../store/slices/errorSlice/ErrorSlice";
import { protocol } from "../../../Helpers/Protocol";
import MyLinkItem from "./MyLinkItem";
import LoadingSpinner from "../../Ui/LoadingSpinner";
import classes from "./Mylinks.module.css";

const Mylinks = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formIsValid, setFormIsValid] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const user = useSelector((state) => state.data.user);
  const mylinks = useSelector((state) => state.data.links);
  const token = useSelector((state) => state.auth.token);

  const { error, isLoading, sendRequest } = useHttp();

  /* FETCH (GET) CALL FOR USER INFO */
  useEffect(() => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/users/aboutMe",
      headers: { Authorization: `Bearer ${token}` },
    };
    const dataGrabber = (data) => {
      const user = data.data.data;

      dispatch(UserDataActions.storeUser(user));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [token, sendRequest, dispatch]);

  /* FETCH (GET) CALL FOR USER MYLINKS (MOST RECENT FIRST) */
  useEffect(() => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/myurl",
      headers: { Authorization: `Bearer ${token}` },
    };
    const dataGrabber = (data) => {
      const links = data.data;

      dispatch(UserDataActions.storeLinks(links));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [token, sendRequest, dispatch]);

  /* FORM INPUT SETTINGS */
  const re =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    inputHandler,
    blurHandler,
    clear,
  } = useInput((value) => value.toLowerCase().trim().match(re) !== []);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredUrlIsValid) {
      setFormIsValid(true);
    }
  }, [enteredUrlIsValid]);

  /* FETCH CALL TO CREATE NEW URL */
  const urlFormSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    const data = protocol(enteredUrl);

    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/myurl",
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      navigate("/", { replace: true });
    };

    sendRequest(requestConfig, dataGrabber);
    clear();
  };

  /* PAGINATION */
  const linksPerPage = 5;
  const pagesVisited = pageNo * linksPerPage;
  const pageCount = Math.ceil(mylinks.length / linksPerPage);

  const displayLinks = mylinks
    ?.slice(pagesVisited, pagesVisited + linksPerPage)
    .map((mylink) => (
      <MyLinkItem
        key={mylink._id}
        fullUrl={mylink.fullUrl}
        shortUrl={mylink.shortUrl}
        visits={mylink.visits}
      />
    )) ?? <MyLinkItem />;

  const changePageHandler = ({ selected }) => {
    setPageNo(selected);
  };

  /* ERROR HANDLING OF FETCH CALLS */
  useEffect(() => {
    if (error) {
      dispatch(ErrorSliceActions.error(true));
    }
  }, [error, dispatch]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={classes["user-view__form-container"]}>
          <div className={classes["profile-details"]}>
            <div
              className={`${classes["form__group"]} ${classes["form__photo-upload"]}`}
            >
              <img
                className={classes["form__user-photo"]}
                src={user?.photo}
                alt={user?.name}
              />
            </div>
            <h2 className={`${classes["heading-secondary"]}`}>{user?.name}</h2>
            <div className={classes["flex-center"]}>
              <p
                className="p-opensans ma-bt-md"
                style={{ marginRight: "5rem" }}
              >
                Visits{" "}
                <strong style={{ color: "var(--color-blue)" }}>
                  {user.totalUrlVisits}
                </strong>
              </p>
              <p className="p-opensans ma-bt-md">
                Links{" "}
                <strong style={{ color: "var(--color-blue)" }}>
                  {user?.mylinks?.length}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {!isLoading && <div className="line">&nbsp;</div>}
      {!isLoading && (
        <div className={`${classes["user-view__form-container"]} flex-column`}>
          <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
            Shorten Your URL
          </h2>
          <form onSubmit={urlFormSubmitHandler} className={classes.shortbox}>
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
        </div>
      )}
      {!isLoading && <div className="line">&nbsp;</div>}
      {!isLoading && (
        <div className={classes["user-view__form-container"]}>
          <section className="flex-column">
            <h2 className={`${classes["heading-secondary"]} `}>My Links</h2>
            <ul>{displayLinks}</ul>
          </section>
          <ReactPaginate
            previousLabel={
              <AiOutlineLeft fontSize={25} className={classes["react-icon"]} />
            }
            nextLabel={
              <AiOutlineRight fontSize={25} className={classes["react-icon"]} />
            }
            pageCount={pageCount}
            onPageChange={changePageHandler}
            containerClassName={classes.paginationContainer}
            previousLinkClassName={classes.prevPage}
            nextLinkClassName={classes.nextPage}
            activeClassName={classes.activePage}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Mylinks;
