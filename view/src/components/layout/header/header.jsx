import React, { useState, useEffect } from "react";

// import search and category component
import Search from "./search";
import Category from "./category";

// main website logo
import BBlogo from "../../images/bb-logo-1.svg";

// React Router DOM
import { Link, useNavigate } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";

// React Icons
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiHome, HiOutlineClipboardList, HiOutlineUserCircle } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
// import {FaUser} from "react-icons/fa";
import {
  MdShoppingCart,
  MdKeyboardArrowDown,
  MdMenu,
  MdDashboardCustomize,
} from "react-icons/md";

// main header css file
import "./header.css";

// Header Component
const Header = () => {
  // category dropdown
  const [clickStatus, setDropClick] = useState(0);
  // user-profile dropdown
  const [userProfile, setUserProfile] = useState(0);
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  const dispatch = useDispatch(); //for logout
  // const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // user logout click handler
  const userLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated]);
  return (
    <div className="container-fluid ecom-header">
      <div className="row">
        {/* logo, category */}
        <div className="col-md-4 main-logo align-items-center py-0">
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
        {/* search bar */}
        <div className="col-md-5 search-bar pr-center">
          <Search />
        </div>
        {/* logout, login, cart  */}
        <div className="col-md-3 info-bar pr-center">
          {isAuthenticated ? (
            <div
              className="cat-click"
              onClick={() => {
                userProfile === 1
                  ? setUserProfile(0)
                  : setUserProfile(userProfile + 1);
              }}
            >
              Hello,{" "}
              <span className="user-name-color">{user?.name?.split(" ")[0]}</span>{" "}
              <MdKeyboardArrowDown />
              <div className={userProfile === 1 ? "cat-dropdown" : "hide"}>
                <Link to="/user/account#user-account">
                  <CgProfile /> Your profile
                </Link>
                <Link onClick={userLogout}>
                  <CiLogout /> Log out
                </Link>
              </div>
            </div>
          ) : (
            <Link to={"/user/login"}>Hello, Sign in</Link>
          )}

          <Link to={"/orders/"}>My order</Link>
          <Link to={"/mycart"} className="pr-center">
            <MdShoppingCart />
            <sup className="text-danger">
              {cartItems ? cartItems.length : 0}
            </sup>
            &nbsp;My Cart
          </Link>
        </div>
        <div className="mobile-footer-nav">
          <Link to={"/#main-home"}>
            <HiHome />
            <span>Home</span>
          </Link>
          <Link to={"/products#products"}>
            <GiHamburgerMenu />
            <span>Products</span>
          </Link>
          <Link to={isAuthenticated ? "/user/account#user-account" : "/user/login"}>
            <HiOutlineUserCircle />
            <span>Account</span>
          </Link>
          <Link to={"/mycart#my-cart"}>
            <MdShoppingCart />
            <sup className="text-danger">
              {cartItems ? cartItems.length : 0}
            </sup>
            <span>Cart</span>
          </Link>
          <Link to={"/orders#my-order"}>
            <HiOutlineClipboardList />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
