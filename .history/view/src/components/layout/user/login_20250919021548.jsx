import React, { useState, useEffect } from "react";
import "./user.css";
import Logo from "../../images/bb-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../metaData";
import Loader from "../loader/loader";
import { useAuth } from "../../../hooks/use-auth";
import { useSnackbar } from "../../../hooks/use-snackbar";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(`Email is:${email}, Password is:${password}`);

    login({ email, password });
  };

  const redirect = location.search
    ? `/${location.search.split("=")[1]}`
    : "/user/account";

  useEffect(() => {
    if (error) {
      console.log(error);
      clearError();
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [error, navigate, isAuthenticated, redirect, clearError]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login Page - The Men Hood" />
          <div className="container-fluid main-wrap-user">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <Link to={"/"} className="login-logo">
                  <img src={Logo} alt="The Men Hood Logo" />
                </Link>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <h1>Sign in to your account</h1>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <div className="form-wrap-user">
                  <form onSubmit={loginSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="uname-email">Email address</label>
                        <br />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-12 mt-3">
                        <div className="password-div">
                          <label htmlFor="password">Password</label>
                          <br />
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                          <Link
                            to={"/forgotpassword"}
                            className="forgot-pass-link"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          name="submit"
                          id="submit"
                          className="btn d-block mt-3"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-3">
                <div className="create-link-box text-center">
                  <span>
                    Not have an account? {""}
                    <Link to={"/user/signup/"} className="text-decoration-none">
                      Create an account
                    </Link>
                  </span>
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-5">
                <div className="nav black-bag-login-nav">
                  <Link
                    to={"/about"}
                    className="nav-item text-decoration-none mx-2"
                  >
                    Privacy & policy
                  </Link>
                  <Link
                    to={"/about"}
                    className="nav-item text-decoration-none mx-2"
                  >
                    About
                  </Link>
                  <Link
                    to={"/contact"}
                    className="nav-item text-decoration-none mx-2"
                  >
                    Contact
                  </Link>
                  <Link
                    to={"/"}
                    className="nav-item text-decoration-none mx-2 text-secondary"
                  >
                    Black Bag
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
