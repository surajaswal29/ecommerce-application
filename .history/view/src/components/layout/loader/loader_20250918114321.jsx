import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="vh-100 loader-cover pr-center">
      <div className="custom-loader"></div>
      <div className="loader-text">Eccom-App</div>
      <div className="loader-subtext">Loading your shopping experience...</div>
    </div>
  );
};

export default Loader;