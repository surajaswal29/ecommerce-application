import React from "react";
import { product } from "../Home/Home";

const Minibox = ({ onHoverEvent, imgIndex }) => {
  return (
    <>
      <div
        className="mini-img-box"
        onMouseEnter={() => {
          onHoverEvent(imgIndex);
        }}
      >
        <img src={product.images.url[imgIndex]} alt={`Product ${imgIndex}`} />
      </div>
    </>
  );
};

export default Minibox;
