import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import useHttp from "../../../hooks/use-Http";
import useInput from "../../../hooks/use-input";
import { ErrorSliceActions } from "../../../store/slices/errorSlice/ErrorSlice";
import { UserDataActions } from "../../../store/slices/userDataSlice/UserDataSlice";
import Input from "../../Ui/Input";
import MyLinkItem from "./MyLinkItem";
import classes from "./Mylinks.module.css";
import Alerts from "../../Ui/Alerts";

const MylinksDB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [formIsValid, setFormIsValid] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const mylinks = useSelector((state) => state.data.links);

  const { error, sendRequest } = useHttp();

  /* FETCH (GET) CALL FOR USER MYLINKS (MOST RECENT FIRST) */
  useEffect(() => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/myurl?sort=lastVisited",
      headers: { Authorization: `Bearer ${token}` },
    };
    const dataGrabber = (data) => {
      const links = data.data;

      dispatch(UserDataActions.storeLinks(links));
    };

    sendRequest(requestConfig, dataGrabber);
  }, [token, sendRequest, dispatch]);

  /* STORING AND VALIDATING FORM INPUT USING CUSTOM INPUT HOOK */
  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    inputHandler,
    blurHandler,
    clear,
  } = useInput((value) => value.toLowerCase().trim().length === 7);

  /* VERIFY FORM */
  useEffect(() => {
    if (enteredUrlIsValid) {
      setFormIsValid(true);
    }
  }, [enteredUrlIsValid]);

  /* FETCH (DELETE) CALL FOR MYLINKS */
  const deleteMyLinkHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const mylink = enteredUrl.toLowerCase();

    const requestConfig = {
      url: `https://mylinks-url.herokuapp.com/api/v1/myurl/${mylink}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      /* FOR SUCCESSFUL REQUEST */
      setDeleteComplete(true);
      setTimeout(() => {
        setDeleteComplete(false);
        navigate("/", { replace: true });
      }, 2000);
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

  /* ERROR HANDLING FOR FETCH REQUESTS */
  useEffect(() => {
    if (error) {
      dispatch(ErrorSliceActions.error(true));
    }
  }, [error, dispatch]);

  const totalvisits =
    mylinks?.reduce((acc, mylinks) => acc + mylinks.visits, 0) || 0;
  const totalLinks = mylinks?.length || 0;

  return (
    <React.Fragment>
      {deleteComplete && <Alerts type="success" msg="MyLink Deleted!" />}
      <div className={classes["user-view__form-container"]}>
        <div className={classes["flex-center"]} style={{ marginTop: "3rem" }}>
          <p
            className="p-opensans ma-bt-md"
            style={{ marginLeft: "1rem", marginRight: "5rem" }}
          >
            Total Visits{" "}
            <strong style={{ color: "var(--color-blue)" }}>
              {totalvisits}
            </strong>
          </p>
          <p className="p-opensans ma-bt-md">
            Total Links On Database{" "}
            <strong style={{ color: "var(--color-blue)" }}>{totalLinks}</strong>
          </p>
        </div>
        <div className="line" style={{ margin: "1rem 0" }}>
          &nbsp;
        </div>
        <section className={`flex-column ma-bt-lg`}>
          <h2
            className={`${classes["heading-secondary"]} ${classes["font-size"]}`}
          >
            Oldest MyLinks
          </h2>
          <ul>{displayLinks}</ul>
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
        </section>
      </div>

      <div className="line">&nbsp;</div>

      <div className={classes["user-view__form-container"]}>
        <h2 className={`${classes["heading-secondary"]} ma-bt-md`}>
          Delete MyLink
        </h2>
        <form
          onSubmit={deleteMyLinkHandler}
          className={`${classes.form} ${classes["form-user-settings"]}`}
        >
          <Input
            label="MyLink"
            id="delete"
            type="text"
            placeholder="aaa5fe4"
            value={enteredUrl}
            onBlur={blurHandler}
            onChange={inputHandler}
          />

          <div className={`${classes["form__group"]} right`}>
            <button className="custom-button" type="submit">
              Delete Mylink
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MylinksDB;
