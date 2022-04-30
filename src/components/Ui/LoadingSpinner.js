import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <section className="section-padding flex-column">
      <div className={`${classes.spinner}`}></div>
    </section>
  );
};

export default LoadingSpinner;
