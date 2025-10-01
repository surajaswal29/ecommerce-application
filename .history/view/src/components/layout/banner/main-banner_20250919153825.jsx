import React from "react";
import { Link } from "react-router-dom";

// importing swiper
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// images

// main css file
import "./banner.css";

const MainBanner = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-banner p-0">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://placehold.co/600x400`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://placehold.co/600x400`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://placehold.co/600x400`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://placehold.co/600x400`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3">
          <div className="mens-promotional-banner">
            <img src={`https://placehold.co/600x400`} alt="flash1" />
          </div>
        </div>
        <div className="col-md-6 p-3">
          <div className="mens-promotional-banner">
            <img src={`https://placehold.co/600x400`} alt="flash2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
