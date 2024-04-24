import React, { useState } from "react";
import Category from "../header/category";
import Slider from "@mui/material/Slider";
import { CiFilter } from "react-icons/ci";

const SideBar = () => {
  const [price, setPrice] = useState([0, 25000]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  return (
    <>
      <h4 className="side-heading">
        <CiFilter />
        Filters
      </h4>
      <div className="price-filter">
        <span>Price</span>
        <div className="slider-component">
          <Slider
            aria-labelledby="range-slider"
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            min={0}
            max={25000}
            step={1000}
          />
        </div>
      </div>
      <div className="nav-sidebar mt-2">
        <span>Category</span>
        <Category />
      </div>
    </>
  );
};

export default SideBar;
