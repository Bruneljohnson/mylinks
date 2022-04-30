import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div onClick={props.onClick} className={classes[`modal-backdrop`]}></div>
  );
};

const Overlay = (props) => {
  return (
    <div className={`${classes[`modal-overlay`]} ${classes[`slide-down`]}`}>
      <div className={classes[`modal-overlay_content`]}>
        <section
          className="flex-column"
          style={{ margin: "2rem auto", width: "75%", gap: "1.5rem" }}
        >
          <h2 className={`${classes["heading-secondary--error"]}`}>Error</h2>
          <h2
            className={`${classes["heading-secondary--error"]} ${classes["font-size"]}`}
          >
            {props.message}
          </h2>
          <p className="p-opensans ma-bt-md">{props.advice}</p>

          <button
            type="button"
            onClick={props.onClick}
            className="custom-button"
          >
            {props.buttonLabel}
          </button>
        </section>
      </div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById(`backdrop-root`)
      )}
      {ReactDOM.createPortal(
        <Overlay
          onClick={props.onClick}
          errorState={props.errorState}
          message={props.message}
          advice={props.advice}
          buttonLabel={props.buttonLabel}
        />,
        document.getElementById(`overlay-root`)
      )}
    </React.Fragment>
  );
};

export default Modal;
