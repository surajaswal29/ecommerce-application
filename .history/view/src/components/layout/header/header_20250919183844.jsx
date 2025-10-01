import { useEffect, useState } from "react";

// import search and category component
import Category from "./category";
import Search from "./search";

// main website logo
import BBlogo from "../../images/bb-logo.svg";

// React Router DOM
import { Link, useNavigate } from "react-router-dom";

// Redux Imports
import { useAuth } from "../../../hooks/use-auth";

// React Icons
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineClipboardList, HiOutlineUserCircle } from "react-icons/hi";
// import {FaUser} from "react-icons/fa";
import {
  MdMenu,
  MdShoppingCart
} from "react-icons/md";

// Using Bootstrap classes only - no custom CSS needed

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

  const { user, isAuthenticated, logout } = useAuth();

  // user logout click handler
  const userLogout = () => {
    logout();
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
  }, [isAuthenticated, navigate]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        {/* Logo and Brand */}
        <div className="navbar-brand d-flex align-items-center me-4">
          <Link to="/" className="text-decoration-none text-white d-flex align-items-center">
            <img src={BBlogo} className="me-2" alt="Black Bag Logo" style={{height: '40px'}} />
            <span className="fw-bold">Black Bag</span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="d-none d-lg-flex align-items-center me-4">
          <Link to="/products" className="nav-link text-white me-3">All Products</Link>
          <div className="dropdown">
            <button
              className="btn btn-link text-white text-decoration-none dropdown-toggle"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clickStatus === 1 ? setDropClick(0) : setDropClick(clickStatus + 1);
              }}
            >
              Categories
            </button>
            <div className={`dropdown-menu ${clickStatus === 1 ? 'show' : ''}`}>
              <Category />
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="d-none d-lg-flex flex-grow-1 justify-content-center me-4">
          <Search />
        </div>

        {/* User Menu and Cart - Desktop */}
        <div className="d-none d-lg-flex align-items-center">
          {isAuthenticated ? (
            <div className="dropdown me-3">
              <button
                className="btn btn-link text-white text-decoration-none dropdown-toggle"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  userProfile === 1 ? setUserProfile(0) : setUserProfile(userProfile + 1);
                }}
              >
                Hello, <span className="text-success">{user?.name?.split(" ")[0]}</span>
              </button>
              <div className={`dropdown-menu dropdown-menu-end ${userProfile === 1 ? 'show' : ''}`}>
                <Link to="/user/account#user-account" className="dropdown-item" onClick={() => setUserProfile(0)}>
                  <CgProfile className="me-2" /> Your profile
                </Link>
                <Link to="/orders/" className="dropdown-item" onClick={() => setUserProfile(0)}>
                  <HiOutlineClipboardList className="me-2" /> My Orders
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" onClick={userLogout}>
                  <CiLogout className="me-2" /> Log out
                </Link>
              </div>
            </div>
          ) : (
            <Link to="/user/login" className="nav-link text-white me-3">Hello, Sign in</Link>
          )}

          <Link to="/mycart" className="btn btn-outline-light position-relative">
            <MdShoppingCart className="me-1" />
            My Cart
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MdMenu />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
        <div className="navbar-nav d-lg-none">
          <div className="nav-item">
            <Search />
          </div>
          <Link to="/products" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
            <GiHamburgerMenu className="me-2" /> Products
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/user/account#user-account" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                <HiOutlineUserCircle className="me-2" /> Account
              </Link>
              <Link to="/orders/" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                <HiOutlineClipboardList className="me-2" /> My Orders
              </Link>
            </>
          ) : (
            <Link to="/user/login" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
              <HiOutlineUserCircle className="me-2" /> Sign In
            </Link>
          )}
          <Link to="/mycart" className="nav-link text-white position-relative" onClick={() => setMobileMenuOpen(false)}>
            <MdShoppingCart className="me-2" />
            Cart
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
