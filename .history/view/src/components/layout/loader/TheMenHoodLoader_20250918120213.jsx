import React from "react";
import "./loader.css";

import BlackBagLoader from "../../media/black-bag-loader.gif";

const BlackBagLoaderGif = () => {
  return (
    <div className="vh-100 loader-cover pr-center">
      <img src={BlackBagLoader} alt="Black Bag Gif" />
    </div>
  )
}

export default BlackBagLoaderGif;