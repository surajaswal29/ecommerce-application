import React from "react";
import { Outlet } from "react-router";
import Footer from "./footer/footer";
import Header from "./header/header";

import { useSelector } from "react-redux";
import TheMenHoodLoaderGif from "../layout/loader/TheMenHoodLoader";

const Layout = () => {
  // console.log(props);

  const {loading} = useSelector((state)=>state.user);

  return (
    <>
    {
      loading?(
        <TheMenHoodLoaderGif/>
      ):(
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )
    }
    </>
  );
};

export default Layout;
