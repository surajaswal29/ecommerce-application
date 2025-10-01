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
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={BBlogo} className="me-2" alt="Black Bag Logo" style={{height: '40px'}} />
          <span className="fw-bold text-white">Black Bag</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          {/* Desktop Navigation Links */}
          <ul className="navbar-nav me-auto d-none d-lg-flex">
            <li className="nav-item">
              <Link to="/products" className="nav-link text-white">All Products</Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn btn-link text-white text-decoration-none dropdown-toggle nav-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded={clickStatus === 1}
                onClick={(e) => {
                  e.stopPropagation();
                  clickStatus === 1 ? setDropClick(0) : setDropClick(clickStatus + 1);
                }}
              >
                Categories
              </button>
              <ul className={`dropdown-menu ${clickStatus === 1 ? 'show' : ''}`}>
                <li><Category /></li>
              </ul>
            </li>
          </ul>

          {/* Search Bar - Desktop */}
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center me-4">
            <Search />
          </div>

          {/* User Menu and Cart - Desktop */}
          <ul className="navbar-nav d-none d-lg-flex">
            {isAuthenticated ? (
              <li className="nav-item dropdown me-3">
                <button
                  className="btn btn-link text-white text-decoration-none dropdown-toggle nav-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={userProfile === 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    userProfile === 1 ? setUserProfile(0) : setUserProfile(userProfile + 1);
                  }}
                >
                  Hello, <span className="text-success">{user?.name?.split(" ")[0]}</span>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${userProfile === 1 ? 'show' : ''}`}>
                  <li>
                    <Link to="/user/account#user-account" className="dropdown-item" onClick={() => setUserProfile(0)}>
                      <CgProfile className="me-2" /> Your profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders/" className="dropdown-item" onClick={() => setUserProfile(0)}>
                      <HiOutlineClipboardList className="me-2" /> My Orders
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" onClick={userLogout}>
                      <CiLogout className="me-2" /> Log out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item me-3">
                <Link to="/user/login" className="nav-link text-white">Hello, Sign in</Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/mycart" className="btn btn-outline-light position-relative">
                <MdShoppingCart className="me-1" />
                My Cart
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className="d-lg-none w-100">
            <div className="mb-3">
              <Search />
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/products" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                  <GiHamburgerMenu className="me-2" /> Products
                </Link>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link to="/user/account#user-account" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                      <HiOutlineUserCircle className="me-2" /> Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/orders/" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                      <HiOutlineClipboardList className="me-2" /> My Orders
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/user/login" className="nav-link text-white" onClick={() => setMobileMenuOpen(false)}>
                    <HiOutlineUserCircle className="me-2" /> Sign In
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/mycart" className="nav-link text-white position-relative" onClick={() => setMobileMenuOpen(false)}>
                  <MdShoppingCart className="me-2" />
                  Cart
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
