import React from "react";
import ReactStar from "react-rating-stars-component";
import ProfilePic from "../../images/profile_user.jpg";

const Review = ({ rev }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 10 : 15,
    value: rev.rating,
    isHalf: true,
  };

  return (
    <div className="p-2 border rounded my-3">
      <div className="d-flex align-items-center">
        <div className="rev-user-img">
          <img src={ProfilePic} alt="user profile icon" />
        </div>
        &nbsp;
        <span className="text-bold">
          {rev.name} <ReactStar {...options} />
        </span>
      </div>
      <p className="comment-txt py-2">{rev.comment}</p>
    </div>
  );
};

export default Review;
