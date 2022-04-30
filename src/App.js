import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AccountPage from "./components/Pages/AccountPage";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import SignupPage from "./components/Pages/SignupPage";
import LoadingSpinner from "./components/Ui/LoadingSpinner";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import "./App.css";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/Pages/ResetPasswordPage";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const id = useSelector((state) => state.auth.id);
  return (
    <React.Fragment>
      <Layout>
        {/* <Suspense fallback={<LoadingSpinner />}> */}
        <Routes>
          <Route
            path="/*"
            element={
              isAuth ? <Navigate to={`/user/${id}`} replace /> : <HomePage />
            }
          />
          {!isAuth && <Route path="/login" element={<LoginPage />} />}
          {!isAuth && <Route path="/signup" element={<SignupPage />} />}
          <Route
            path="/user/:id"
            element={
              isAuth ? <AccountPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        {/* </Suspense> */}
      </Layout>
    </React.Fragment>
  );
}

export default App;
