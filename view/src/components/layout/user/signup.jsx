import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Change title of the current page using Helmet pkg
import MetaData from "../metaData";

import { userRegister } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/loader";

// Signup Component
const Signup = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  // user data object hook
  const [user, setUser] = useState({
    uname: "",
    email: "",
    password: "",
  });

  // on submitting form
  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(userRegister(user));
  };

  // on input value change
  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user/account`);
    }
  }, [navigate, loading, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Create an account - Shopio" />
          <div className="container-fluid main-wrap-user">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <Link to={"/"} className="login-logo my-3">
                  <img src={"/shopio_logo.png"} alt="Shopio Logo" />
                </Link>
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-3">
                <h1>Create an account</h1>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <div className="form-wrap-user">
                  <form onSubmit={registerSubmit}>
                    <div className="row">
                      <div className="col-md-12 mt-2">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          value={user.email}
                          onChange={registerDataChange}
                          className="form-control"
                          autoComplete="email"
                        />
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input
                          required
                          type="password"
                          name="password"
                          id="password"
                          value={user.password}
                          onChange={registerDataChange}
                          className="form-control"
                          autoComplete="password"
                        />
                      </div>
                      <div className="w-full my-2">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                      <div className="col-md-12">
                        <button
                          type="submit"
                          name="submit"
                          id="submit"
                          className="btn d-block mt-3"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-3">
                <div className="create-link-box text-center">
                  <span>
                    Already have an account? {""}
                    <Link to={"/user/login/"} className="text-decoration-none">
                      Sign in
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
                    Shopio
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

export default Signup;
