import React, { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// Redux imports
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../../actions/userAction";
import ProfileImage from "../../images/profile_user.jpg";

const Account = ({ userData, isAuthenticated }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { user } = useSelector((state) => state.user);

  const [updateUserData, setUpdateUserData] = useState({
    updateName: userData ? userData.name : "",
    updateEmail: userData ? userData.email : "",
  });
  const [updateAvatar, setUpdateAvatar] = useState(
    userData ? userData.avatar.url : ProfileImage
  );

  const { updateName, updateEmail } = updateUserData;

  const updateUserProfile = (e) => {
    e.preventDefault();

    const updateData = new FormData();

    updateData.set("updateName", updateName);
    updateData.set("updateEmail", updateEmail);
    updateData.set("updateAvatar", updateAvatar);

    // dispatch(updateUser(updateData));
  };

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setUpdateAvatar(fileReader.result);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    } else {
      setUpdateUserData({ ...updateUserData, [e.target.name]: e.target.value });
    }
  };

  return (
    userData && (
      <>
        <div className="container-fluid pr-center">
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
                            src={userData ? userData.avatar.url : ProfileImage}
                            alt="ProfileImage"
                          />
                        </div>
                        <h2 className="text-center">{userData.name}</h2>
                        <span className="text-center d-block">
                          {userData.email}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-8 profile-data-box">
                      <h4>Edit profile</h4>
                      <div className="form-wrap-user form-wrap-user-1 mt-2">
                        <form
                          onSubmit={updateUserProfile}
                          encType="multitype/form-data"
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <label>Name</label>
                              <input
                                type="text"
                                value={updateName}
                                name="updateName"
                                className="form-control mb-3"
                                onChange={updateDataChange}
                              />
                            </div>
                            <div className="col-md-12">
                              <label>Email</label>
                              <input
                                type="email"
                                value={updateEmail}
                                name="updateEmail"
                                onChange={updateDataChange}
                                className="form-control mb-3"
                              />
                            </div>
                            <div className="col-md-12">
                              <label>Avatar</label>
                              <input
                                type="file"
                                className="form-control mb-2"
                                name="updateAvatar"
                                onChange={updateDataChange}
                              />
                            </div>
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="edit-save-btn mt-2"
                              >
                                save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Account;
