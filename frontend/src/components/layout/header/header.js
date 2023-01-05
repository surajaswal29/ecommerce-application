import React, { useState } from "react";
import "./header.css";
import Search from "./search";
import Category from "./category";
import BBlogo from "../../images/bb-logo-1.svg";
import { Link } from "react-router-dom";
import { MdShoppingCart, MdKeyboardArrowDown, MdMenu } from "react-icons/md";

const Header = () => {
  const [clickStatus, setDropClick] = useState(0);

  return (
    <div className="container-fluid ecom-header">
      <div className="row">
        <div className="col-md-4 main-logo d-flex align-items-center py-0">
          <div className="logo">
            <Link to="/">
              <img src={BBlogo} className="img-fluid" alt="Black Bag Logo" />
            </Link>
          </div>
          <div className="address-box pr-center-even">
            {/* <a href="http://localhost:3000/setAddress">
              <MdAddLocationAlt /> Address
            < /Link > */}
            <Link to={"/products"}>All Products</Link>
            <div
              className="cat-click"
              onClick={() => {
                clickStatus === 1
                  ? setDropClick(0)
                  : setDropClick(clickStatus + 1);
              }}
            >
              Categories <MdKeyboardArrowDown />
              <div className={clickStatus === 1 ? "cat-dropdown" : "hide"}>
                <Category />
              </div>
            </div>
          </div>
          <div className="ham-menu">
            <MdMenu />
          </div>
        </div>

        <div className="col-md-5 search-bar pr-center">
          <Search />
        </div>
        <div className="col-md-3 info-bar pr-center">
          <Link to={"/user/login"}>Hello, Sign in</Link>
          <Link to={"/order"}>My order</Link>
          <Link to={"/mycart"} className="pr-center">
            <MdShoppingCart />
            <sup className="text-danger">0</sup>&nbsp;My Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
