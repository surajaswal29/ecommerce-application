import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { Heart } from "lucide-react"
import { plantCategoryData, productData } from "../../utils/constants"

const Home = () => {
  return (
    <div className='w-full px-4 md:px-12'>
      {/* banners */}
      <div className='w-full my-6 flex flex-col md:flex-row gap-4 md:h-[450px]'>
        <div className='w-full md:w-8/12 h-full rounded-md overflow-hidden'>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper'
          >
            <SwiperSlide>
              <img
                src='https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714675622/ecommerce/3_vgbmhk.jpg'
                alt=''
                className='w-full h-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src='https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714675620/ecommerce/5_na2tax.jpg'
                alt=''
                className='w-full h-full object-cover'
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src='https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714675508/ecommerce/2_jwdkfd.png'
                alt=''
                className='w-full h-full object-cover'
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='w-full md:w-4/12 h-full flex flex-col'>
          <div className='flex-1 rounded-md overflow-hidden'>
            <img
              src='https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714675620/ecommerce/5_na2tax.jpg'
              alt=''
              className='w-full h-full object-fill'
            />
          </div>
          <div className='flex-1 rounded-md overflow-hidden mt-6'>
            <img
              src='https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714675508/ecommerce/2_jwdkfd.png'
              alt=''
              className='w-full h-full object-fill'
            />
          </div>
        </div>
      </div>

      {/* top categories */}
      <div className='w-full mt-10'>
        <div className='w-full'>
          <h1 className='text-lg font-medium text-gray-800'>Top Categories</h1>
        </div>
        <div className='w-full mt-3 grid grid-cols-4 overflow-auto gap-6'>
          {plantCategoryData
            .filter(
              (i) =>
                i.title === "Flowers" ||
                i.title === "Herbs" ||
                i.title === "Seeds" ||
                i.title === "Decoration"
            )
            .map((item) => (
              <div
                key={item}
                className='shrink-0 flex p-6 bg-white shadow rounded-md mb-4 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-green-100 duration-200'
              >
                <div className='w-full h-[100px]'>
                  <img
                    src={item.image}
                    alt='Product Image'
                    className='w-full h-full object-contain'
                  />
                </div>
                <div className='w-full p-4 text-left'>
                  <h1 className='font-medium text-gray-800 text-lg'>{item.title}</h1>
                  <p>1200K Sold</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* featured product */}
      <div className='w-full mt-10'>
        <div className='w-full'>
          <h1 className='text-lg font-medium text-gray-800'>
            Best sellers products
          </h1>
        </div>
        <div className='w-full mt-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {productData.filter((i, index) => index < 8).map((item) => (
            <div
              key={item.title}
              className='w-full bg-gray-50 shadow rounded-lg mb-4 cursor-pointer hover:shadow-lg ease-in-out duration-200'
            >
              <div className='w-full h-[300px] p-3 relative'>
                <img
                  src={item.images[0]}
                  alt='Product Image'
                  className='w-full h-full object-cover rounded-md'
                />
                <span className='absolute top-5 right-5 text-red-200'>
                  <Heart fill="red" />
                </span>
              </div>
              <div className='w-full h-[120px] p-4 flex flex-col justify-between'>
                <h1 className='font-medium text-gray-800'>
                  {item.title}
                </h1>
                <div className='w-full flex items-center justify-between'>
                  <p className='text-gray-600'>₹{(item.price * 80).toFixed(2)}</p>
                  <button className='bg-blue-400 text-white p-2 px-3 font-medium rounded-md'>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full h-[40vh]'></div>
    </div>
  )
}

export default Home
