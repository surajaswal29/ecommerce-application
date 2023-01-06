import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import ProfileImage from "../../images/profile_user.jpg";

const Account = () => {
  const [updateUserData, setUpdateUserData] = useState({
    updateName: "Suraj Udai Aswal",
    updateEmail: "surajaswal29@gmail.com",
  });
  const [updateAvatar, setUpdateAvatar] = useState(ProfileImage);

  const { updateName, updateEmail } = updateUserData;

  const updateUserProfile = (e) => {
    e.preventDefault();

    const updateData = new FormData();

    updateData.set("updateName", updateName);
    updateData.set("updateEmail", updateEmail);
    updateData.set("updateAvatar", updateAvatar);

    console.log(...updateData);
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
    <>
      <Header />
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
                        <img src={ProfileImage} alt="ProfileImage" />
                      </div>
                      <h2 className="text-center">Suraj Udai Aswal</h2>
                      <span className="text-center d-block">
                        surajaswal@gmail.com
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
      <Footer />
    </>
  );
};

export default Account;
