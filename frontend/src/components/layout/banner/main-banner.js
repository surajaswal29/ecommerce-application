import React from "react";
import { Link } from "react-router-dom";

// importing swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";

// images
import MensBanner1 from "../../images/mens-banner-1.jpg";
import MensBanner2 from "../../images/mens-banner-2.jpg";

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
                  src={`https://res.cloudinary.com/dbihgswg7/image/upload/v1673278593/banner/1_sboh49.svg`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://res.cloudinary.com/dbihgswg7/image/upload/v1673279106/banner/2_ci3x1m.png`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://res.cloudinary.com/dbihgswg7/image/upload/v1673278742/banner/4_ovjswi.png`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://res.cloudinary.com/dbihgswg7/image/upload/v1673278737/banner/3_b0eqaa.png`}
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
            <img src={MensBanner1} alt="flash1" />
          </div>
        </div>
        <div className="col-md-6 p-3">
          <div className="mens-promotional-banner">
            <img src={MensBanner2} alt="flash2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
