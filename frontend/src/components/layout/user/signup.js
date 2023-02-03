import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Change title of the current page using Helmet pkg
import MetaData from "../metaData";

// Logo File
import MenLogo from "../../images/bb-logo-1.svg";
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

  // user profile hook
  const [avatar, setAvatar] = useState();

  // getting user data from user object
  const { uname, email, password } = user;

  // on submitting form
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("uname", uname);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    //console.log(...myForm);
    dispatch(userRegister(myForm));
  };

  // on input value change
  const registerDataChange = (e) => {
    // if input type = file and name field is equal to 'avatar'
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // setting data of user object equal to user input values
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      //console.log(error);
      alert(error);
    }
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
          <MetaData title="Create an account - The Men Hood" />
          <div className="container-fluid main-wrap-user">
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <Link to={"/"} className="login-logo">
                  <img src={MenLogo} alt="The Men Hood Logo" />
                </Link>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <h1>Create an account</h1>
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                <div className="form-wrap-user">
                  <form encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="uname">Full Name</label>
                        <br />
                        <input
                          required
                          type="text"
                          name="uname"
                          id="uname"
                          value={uname}
                          onChange={registerDataChange}
                          className="form-control"
                          autoComplete="uname"
                        />
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="email">Email address</label>
                        <br />
                        <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          value={email}
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
                          value={password}
                          onChange={registerDataChange}
                          className="form-control"
                          autoComplete="password"
                        />
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="avatar">Avatar</label>
                        <br />
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          className="form-control"
                          accept="image/*"
                          onChange={registerDataChange}
                        />
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

export default Signup;
