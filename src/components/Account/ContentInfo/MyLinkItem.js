import React from "react";
import classes from "./MyLinkItem.module.css";

const MyLinkItem = (props) => {
  const { fullUrl, shortUrl, visits } = props;

  const fullUrlCorrected =
    fullUrl?.length > 33 ? `${fullUrl.slice(0, 33)}...` : fullUrl;

  return (
    <li className={classes["mylink-item"]}>
      <div className={classes.mylink}>
        <h2 className="p-opensans">{fullUrlCorrected}</h2>
        <a
          className="p-opensans"
          href={`https://mylinks-url.herokuapp.com/api/v1/myurl/${shortUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          {shortUrl}
        </a>
      </div>
      <p className={classes.visits}>
        <strong style={{ color: "var(--color-blue)" }}>
          {typeof visits === "number" && visits > 0 ? `${visits} visits` : ""}
        </strong>
      </p>
    </li>
  );
};

export default MyLinkItem;
