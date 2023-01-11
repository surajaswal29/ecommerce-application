import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ img }) => {
  return (
    <div className="blog-box">
      <Link to={"/blogs"}>
        <div className="blog-img">
          <img src={img} alt="blog" />
        </div>
        <h4 className="mt-2">
          Smart Casual Dress Code: A Modern Man’s Guide For 2023
        </h4>
        <p>
          It’s the dress code that nobody wants to see on an invitation, but
          we're here to unsure you're never over- or underdressed again.
        </p>
      </Link>
    </div>
  );
};

export default Blog;
