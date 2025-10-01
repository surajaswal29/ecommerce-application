import React, { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

// components
import Loader from "../loader/loader";
import MetaData from "../metaData";
import Footer from "../footer/footer";
import Header from "../header/header";

// Redux imports
import { useSelector } from "react-redux";

// Default Profile Image
import ProfileImage from "../../images/profile_user.jpg";
import EditProfile from "./EditProfile";

const Account = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <>
            <Header />
            <MetaData title={`${user.name} Profile`} />
            <div className="container-fluid pr-center" id="user-account">
              <div className="container-account-wrap mt-3">
                <div className="row">
                  <div className="col-md-12 pr-center">
                    <div className="account-profile-wrap">
                      <div className="row">
                        <div className="col-md-4 profile-static-box">
                          <h4>Profile</h4>
                          <div className="profile-main-box">
                            <div className="profile-img mb-2">
                              <img
                                src={user ? user.avatar.url : ProfileImage}
                                alt="ProfileImage"
                              />
                            </div>
                            <h2 className="text-center">{user.name}</h2>
                            <span className="text-center d-block">
                              {user.email}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-8 profile-data-box">
                          <EditProfile user={user} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )
      )}
    </>
  );
};

export default Account;
