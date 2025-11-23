import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import {Pagination,Autoplay,Navigation, FreeMode} from "swiper/modules"
import CourseCard from './CourseCard'
const CourseSlider = ({Courses}) => {
  return (
    <>
      {
           Courses?.length>0? <Swiper  slidesPerView={1} pagination={true} modules={[Pagination,FreeMode]}  breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}    loop={true} spaceBetween={25} className="max-h-[30rem] w-full">
                {
                Courses?.map((course,index)=><SwiperSlide key={index}>
                    <CourseCard course={course} Height={"h-[250px]"}/>
                </SwiperSlide>)
                }

             </Swiper>:<p>No Course Found</p>
        }
    </>
  )
}

export default CourseSlider