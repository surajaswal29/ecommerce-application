import React from "react";
import { Link } from "react-router-dom";

// importing swiper
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// main css file
import "./banner.css";

const banners = [
  "https://res.cloudinary.com/dcq9dxs89/image/upload/v1758277017/3_rjksqj.png",
  "https://res.cloudinary.com/dcq9dxs89/image/upload/v1758277058/7_fu2hhu.png", 
  "https://res.cloudinary.com/dcq9dxs89/image/upload/v1758277050/6_agdk1s.png",
  "https://res.cloudinary.com/dcq9dxs89/image/upload/v1758277041/5_xvlp1i.png",
  "https://res.cloudinary.com/dcq9dxs89/image/upload/v1758277000/2_ehljz6.png"
];

const MainBanner = () => {
  const bannerImages = [
    {
      src: banners[0],
      alt: "Men's Fashion Collection - Discover our latest trends",
      link: "/products?category=topwear"
    },
    {
      src: banners[1],
      alt: "Premium Quality Clothing - Shop now for best deals",
      link: "/products?category=bottomwear"
    },
    {
      src: banners[2],
      alt: "New Arrivals - Fresh styles for every occasion",
      link: "/products?sort=newest"
    },
    {
      src: banners[3],
      alt: "Limited Time Offers - Don't miss out on great deals",
      link: "/products?sale=true"
    },
    {
      src: banners[4],
      alt: "Exclusive Collection - Shop the latest trends",
      link: "/products?featured=true"
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
                src={banners[0]}
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
                src={banners[1]}
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
