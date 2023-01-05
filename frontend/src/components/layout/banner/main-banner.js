import React from "react";
import { Link } from "react-router-dom";

// importing swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper.min.css";

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
                  src={`https://ik.imagekit.io/qu01gwls0/1.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179496741`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://ik.imagekit.io/qu01gwls0/2.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179497511`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://ik.imagekit.io/qu01gwls0/1.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179496741`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://ik.imagekit.io/qu01gwls0/2.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179497511`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://ik.imagekit.io/qu01gwls0/1.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179496741`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
            <SwiperSlide>
              <Link to={"/products"}>
                <img
                  src={`https://ik.imagekit.io/qu01gwls0/2.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1672179497511`}
                  alt="Banner Images"
                  className="img-fluid "
                />
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
