import React from "react";
import "./loader.css";

import EccomAppLoader from "../../media/eccom-app-loader.gif";

const EccomAppLoaderGif = ()=>{
  return(
    <div className="vh-100 loader-cover pr-center">
          <img src={EccomAppLoader} alt="Eccom-App Gif"/>
    </div>
  )
}

export default EccomAppLoaderGif;