import React, { useState, useEffect } from "react";
import "./user.css";
import Logo from "../../images/bb-logo-1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../metaData";
import { clearErrors, userLogin } from "../../../actions/userAction";
import Loader from "../loader/loader";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(`Email is:${email}, Password is:${password}`);

    dispatch(userLogin(email, password));
  };

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/user/account";

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
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
                <div className="nav menhood-login-nav">
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
                    The Men Hood
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
