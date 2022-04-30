import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-Http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../Header/Header";
import { UserDataActions } from "../../store/slices/userDataSlice/UserDataSlice";
import { storeData } from "../../store/slices/userDataSlice/UserDataActionCreators";
import Alerts from "../Ui/Alerts";

const HomePage = () => {
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, sendRequest } = useHttp();

  /* FETCH (POST) REQUEST FOR FREE TESTER */
  const freeTesterHandler = (data) => {
    const requestConfig = {
      url: "https://mylinks-url.herokuapp.com/api/v1/freeTester",
      method: "POST",
      body: data,
      headers: {
        // Authorization: `Bearer ${token}`,
        "content-Type": "application/json",
      },
    };
    const dataGrabber = (data) => {
      const testData = data.data;
      dispatch(UserDataActions.store(testData));
      dispatch(storeData(testData));
    };

    sendRequest(requestConfig, dataGrabber);
  };

  /* ERROR HANDLING FOR FETCH REQUEST */
  useEffect(() => {
    let errorTimer;
    if (error) {
      setHasError(true);
      errorTimer = setTimeout(() => {
        setHasError(false);
        navigate("/signup", { replace: true });
      }, 2000);
    }

    return () => {
      clearTimeout(errorTimer);
    };
  }, [error, navigate]);

  return (
    <React.Fragment>
      {hasError && <Alerts type="error" msg="Free Sample Expired!" />}
      <Header onTester={freeTesterHandler} />
    </React.Fragment>
  );
};

export default HomePage;
