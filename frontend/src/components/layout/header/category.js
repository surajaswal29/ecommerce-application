import React from "react";
import { Link } from "react-router-dom";

// const cat = ["Topwear", "Bottomwear", "Innerwear", "Indian & Festive Wear"];

const Category = () => {
  return (
    <>
      <Link to={"/products/category/Topwear"}>Topwear</Link>
      <Link to={"/products/category/Bottomwear"}>Bottomwear</Link>
      <Link to={"/products/category/Innerwear"}>Innerwear</Link>
      <Link to={"/products/category/Indian & Festive Wear"}>
        Indian & Festive Wear
      </Link>
      <Link to={"/products/category/Footwear"}>Footwear</Link>
      <Link to={"/products/category/Sports & Active Wear"}>
        Sports & Active Wear
      </Link>
      <Link to={"/products/category/Watches"}>Watches</Link>
      <Link to={"/products/category/Sunglasses & Frames"}>
        Sunglasses & Frames
      </Link>
      <Link to={"/products/category/Accessories"}>Accessories</Link>
      <Link to={"/products/category/Personal Care & Grooming"}>
        Personal Care & Grooming
      </Link>
      <Link to={"/products/category/Gadgets"}>Gadgets</Link>
      <Link to={"/products/category/Bags & Backpacks"}>Bags & Backpacks</Link>
    </>
  );
};

export default Category;
