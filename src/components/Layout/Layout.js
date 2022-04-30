import React from "react";
import Footer from "./Footer/Footer";
import MainNav from "./Nav/MainNav";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainNav />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
