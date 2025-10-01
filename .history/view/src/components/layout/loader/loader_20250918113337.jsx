import React from "react";
import "./loader.css";

import EccomAppLoader from "../../media/eccom-app-loader.gif";

const Loader = () => {
  return (
    // <div className="loader-wrap">
    //   <div className="loader"></div>
    // </div>
    <div className="vh-100 loader-cover pr-center">
          <img src={TheMenHoodLoader} alt="TheMenHood Gif"/>
    </div>
  );
};

export default Loader;