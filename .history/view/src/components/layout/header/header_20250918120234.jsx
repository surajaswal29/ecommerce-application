import { useState, useEffect } from "react";

// import search and category component
import Search from "./search";
import Category from "./category";

// main website logo
import BBlogo from "../../images/bb-logo.svg";

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
} from "react-icons/md";

// main header css file
import "./header.css";

// Header Component
const Header = () => {
  // category dropdown
  const [clickStatus, setDropClick] = useState(0);
  // user-profile dropdown
  const [userProfile, setUserProfile] = useState(0);
  // mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const dispatch = useDispatch(); //for logout
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // user logout click handler
  const userLogout = () => {
    dispatch(logout());
    setUserProfile(0);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropClick(0);
      setUserProfile(0);
    };

    if (clickStatus === 1 || userProfile === 1) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clickStatus, userProfile]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="container-fluid ecom-header">
      <div className="row align-items-center">
        {/* logo, category */}
        <div className="col-md-4 main-logo d-flex align-items-center">
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src={BBlogo} className="img-fluid" alt="Black Bag Logo" />
            </Link>
          </div>
          <div className="address-box d-flex align-items-center">
            <Link to={"/products"} className="nav-link">All Products</Link>
            <div
              className="cat-click"
              onClick={(e) => {
                e.stopPropagation();
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
          <div className="ham-menu d-md-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MdMenu />
          </div>
        </div>

        {/* search bar */}
        <div className="col-md-5 search-bar d-flex justify-content-center">
          <Search />
        </div>

        {/* logout, login, cart  */}
        <div className="col-md-3 info-bar d-flex align-items-center justify-content-end">
          {isAuthenticated ? (
            <div
              className="cat-click user-profile-dropdown"
              onClick={(e) => {
                e.stopPropagation();
                userProfile === 1
                  ? setUserProfile(0)
                  : setUserProfile(userProfile + 1);
              }}
            >
              Hello,{" "}
              <span className="user-name-color">{user?.name?.split(" ")[0]}</span>{" "}
              <MdKeyboardArrowDown />
              <div className={userProfile === 1 ? "cat-dropdown user-dropdown" : "hide"}>
                <Link to="/user/account#user-account" onClick={() => setUserProfile(0)}>
                  <CgProfile /> Your profile
                </Link>
                <Link to="/orders/" onClick={() => setUserProfile(0)}>
                  <HiOutlineClipboardList /> My Orders
                </Link>
                <Link onClick={userLogout}>
                  <CiLogout /> Log out
                </Link>
              </div>
            </div>
          ) : (
            <Link to={"/user/login"} className="nav-link">Hello, Sign in</Link>
          )}

          <Link to={"/mycart"} className="cart-link d-flex align-items-center">
            <MdShoppingCart />
            <sup className="cart-count">
              {cartItems.length}
            </sup>
            <span className="cart-text">My Cart</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-footer-nav ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <Link to={"/#main-home"} onClick={() => setMobileMenuOpen(false)}>
            <HiHome />
            <span>Home</span>
          </Link>
          <Link to={"/products#products"} onClick={() => setMobileMenuOpen(false)}>
            <GiHamburgerMenu />
            <span>Products</span>
          </Link>
          <Link to={isAuthenticated ? "/user/account#user-account" : "/user/login"} onClick={() => setMobileMenuOpen(false)}>
            <HiOutlineUserCircle />
            <span>Account</span>
          </Link>
          <Link to={"/mycart#my-cart"} onClick={() => setMobileMenuOpen(false)}>
            <MdShoppingCart />
            <sup className="text-danger">
              {cartItems.length}
            </sup>
            <span>Cart</span>
          </Link>
          <Link to={"/orders#my-order"} onClick={() => setMobileMenuOpen(false)}>
            <HiOutlineClipboardList />
            <span>Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
