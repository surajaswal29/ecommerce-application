import React from "react";
import NotExistAnimation from "../../media/not-exist-animation.mp4";

const NotExist = () => {
  return (
    <>
      <div className="not-exist-video pr-center">
        <video
          src={NotExistAnimation}
          autoPlay
          muted
          loop
          className="video-style"
        ></video>
      </div>

      <div className="not-exist-msg text-center">
        <span>Sorry! Product does not exist</span>
        <br />
        <span>Please kindly try to search another product</span>
      </div>
    </>
  );
};

export default NotExist;
