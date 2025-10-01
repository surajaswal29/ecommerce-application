import React from "react";
import { Link } from "react-router-dom";

// importing swiper
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// images
import mensBanner1 from "../../images/mens-banner-1.jpg";
import mensBanner2 from "../../images/mens-banner-2.jpg";

// main css file
import "./banner.css";

const MainBanner = () => {
  const bannerImages = [
    {
      src: mensBanner1,
      alt: "Men's Fashion Collection - Discover our latest trends",
      link: "/products?category=topwear"
    },
    {
      src: mensBanner2,
      alt: "Premium Quality Clothing - Shop now for best deals",
      link: "/products?category=bottomwear"
    },
    {
      src: mensBanner1,
      alt: "New Arrivals - Fresh styles for every occasion",
      link: "/products?sort=newest"
    },
    {
      src: mensBanner2,
      alt: "Limited Time Offers - Don't miss out on great deals",
      link: "/products?sale=true"
    }
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 main-banner p-0">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            loop={true}
            speed={800}
          >
            {bannerImages.map((banner, index) => (
              <SwiperSlide key={index}>
                <Link to={banner.link}>
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    className="img-fluid"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.svg';
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 p-3">
          <div className="mens-promotional-banner">
            <Link to="/products?category=topwear">
              <img 
                src={mensBanner1} 
                alt="Men's Topwear Collection - Shop Now" 
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-image.svg';
                }}
              />
            </Link>
          </div>
        </div>
        <div className="col-md-6 p-3">
          <div className="mens-promotional-banner">
            <Link to="/products?category=bottomwear">
              <img 
                src={mensBanner2} 
                alt="Men's Bottomwear Collection - Shop Now" 
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-image.svg';
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
