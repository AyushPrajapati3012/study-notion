import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Course_Card from './Course_Card';
import 'swiper/css'
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import "../../.."
// Import required modules
import { FreeMode, Pagination } from "swiper/modules"


const CourseSlider = ({ Courses }) => {
  // const swiper = new Swiper(...);
  console.log('courses', Courses)
  return (
    <>
      {
        Courses?.length ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            modules={[ Pagination]}

            breakpoints={{
              1024: {
                slidesPerView: 2,
              },
            }}
            className="max-h-[30rem]"
          >
            {Courses.map((course) => (
              <SwiperSlide key={course._id}>
                <Course_Card
                  course={course}
                  Height={"h-[250px]"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) :
          (<p className="text-xl text-richblack-5">No Course Found</p>)
      }
    </>
  )
}

export default CourseSlider
