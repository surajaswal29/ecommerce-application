import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <>
      <Link to={"/products/category/Topwear"}>Topwear</Link>
      <Link to={"/products/category/Bottomwear"}>Bottomwear</Link>
      <Link to={"/products/category/Innerwear"}>Innerwear</Link>
      <Link to={"/products/category/Festive Wear"}>Festive Wear</Link>
      <Link to={"/products/category/Footwear"}>Footwear</Link>
      <Link to={"/products/category/Active Wear"}>Sports Wear</Link>
      <Link to={"/products/category/Watches"}>Watches</Link>
      <Link to={"/products/category/Sunglasses & Frames"}>
        Sunglasses & Frames
      </Link>
      <Link to={"/products/category/Accessories"}>Accessories</Link>
      <Link to={"/products/category/Personal Care & Grooming"}>
        Personal Care & Grooming
      </Link>
      <Link to={"/products/category/Gadgets"}>Gadgets</Link>
      <Link to={"/products/category/Backpacks"}>Backpacks</Link>
    </>
  );
};

export default Category;
