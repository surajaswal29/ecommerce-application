import React from "react";
import "./loader.css";

import TheMenHoodLoader from "../../media/themenhood-loader.gif";

const TheMenHoodLoaderGif = ()=>{
  return(
    <div className="vh-100 loader-cover pr-center">
          <img src={TheMenHoodLoader} alt="TheMenHood Gif"/>
    </div>
  )
}

export default TheMenHoodLoaderGif;