import React, { useState, useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUser, clearErrors } from "../../../actions/userAction";

// Default Profile Image
// import ProfileImage from "../../images/profile_user.jpg";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import Loader from "../loader/loader";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateAvatar, setUpdateAvatar] = useState();

  const updateUserProfile = (e) => {
    e.preventDefault();

    const updateData = new FormData();

    updateData.set("updateName", updateName);
    updateData.set("updateEmail", updateEmail);
    updateData.set("updateAvatar", updateAvatar);

    console.log(...updateData);

    dispatch(updateUser(updateData));
  };

  const updateDataChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setUpdateAvatar(fileReader.result);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setUpdateName(user.name);
      setUpdateEmail(user.email);
      setUpdateAvatar(user.avatar.url);
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      console.log("success");
      dispatch(loadUser());
      navigate("/user/account");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, user, loading, isUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h4>Edit profile</h4>
          <div className="form-wrap-user form-wrap-user-1 mt-2">
            <form onSubmit={updateUserProfile} encType="multitype/form-data">
              <div className="row">
                <div className="col-md-12">
                  <label>Name</label>
                  <input
                    type="text"
                    value={updateName}
                    name="updateName"
                    className="form-control mb-3"
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label>Email</label>
                  <input
                    type="email"
                    value={updateEmail}
                    name="updateEmail"
                    onChange={(e) => setUpdateEmail(e.target.value)}
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
                  <button type="submit" className="edit-save-btn mt-2">
                    save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
