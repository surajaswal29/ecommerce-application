import React from "react";

// Footer CSS file
import "./footer.css";

// Black Bag Logo
import BBLogo1 from "../../images/bb-logo-1.svg";
import gg from "../../images/GP.svg";
import ap from "../../images/AS.svg";
import Category from "../header/category";

const Footer = () => {
  const today = new Date();

  return (
    <div className="container-fluid main-footer">
      <div className="row p-5">
        <div className="col-md-2">
          <img
            src={BBLogo1}
            alt="Black Bag Logo"
            className="img-fluid bb-logo"
          />
          <span className="text-light mt-2">Fashion Does Matter.</span>
        </div>
        <div className="col-md-3">
          <strong className="text-light">Categories</strong>
          <div className="nav-footer">
            <Category />
          </div>
        </div>
        <div className="col-md-2">
          <strong className="text-light">Links</strong>
          <div className="nav-footer">
            <a href="https://www.facebook.com/">About</a>
            <a href="https://www.facebook.com/">Contact</a>
            <a href="https://www.facebook.com/">Privacy Policy</a>
          </div>
        </div>
        <div className="col-md-2">
          <strong className="text-light">Connect with Us</strong>
          <div className="nav-footer">
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.facebook.com/">Twitter</a>
            <a href="https://www.facebook.com/">Instagram</a>
          </div>
        </div>
        <div className="col-md-3 app-store social-box">
          <strong className="text-light">Download our Mobile App</strong>
          <div className="app-store-box">
            <a href="https://play.google.com/store/games?hl=en&gl=US&pli=1">
              <img src={gg} alt="Android" />
            </a>
            <a href="https://play.google.com/store/games?hl=en&gl=US&pli=1">
              <img src={ap} alt="IOS" />
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-light copy-right-footer">
          Copyright {today.getFullYear()} &copy; The Men Hood
        </div>
      </div>
    </div>
  );
};

export default Footer;
