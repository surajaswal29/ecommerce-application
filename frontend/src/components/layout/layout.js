import React from "react";
import { Outlet } from "react-router";
import Footer from "./footer/footer";
import Header from "./header/header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
