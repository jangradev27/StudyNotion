import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operation/StudentFeature';
import { apiConnector } from '../services/apiconnector';
import { CourseApi } from '../services/api';
import RatingStars from "../components/common/RatingStars"
import GetAvgRating from '../utils/avgRating';
import { FaRegClock } from "react-icons/fa";
import { CiMobile1, CiMobile2 } from "react-icons/ci";
import { PiCertificate, PiCertificateBold } from "react-icons/pi";
import CourseContentView from '../components/core/Courses/CourseContentView';
import Footer from '../components/common/footer';

const CourseDetails = () => {
    const {token}=useSelector(state=>state.auth)
    const {courseId}=useParams();

    const navigate=useNavigate();
    const dispatch=useDispatch();
   const[Course,setCourse]=useState(null);
    const[avgReviewCount,setReviewCount]=useState(0);
   const getCourseDetailsFun=async()=>{
      const payload={
        courseId:courseId
      }
      const result=await apiConnector("POST",CourseApi.getCourseDetails_api,payload,{
        Authorization:`Bearer ${token}`
      })
      console.log(result);
      setCourse(result.data.data)
      const avgCount=result?.data.data.courseDetails.RatingReviews
      setReviewCount(GetAvgRating(avgCount));
   }
    useEffect(()=>{
      if(courseId){
        getCourseDetailsFun();
      }
          
    },[courseId])
  return (
  <div className=' flex flex-col gap-5'>
      <div className='w-full min-h-[20rem] py-2  px-8 flex  bg-rich-black-700 flex-col gap-2  '>
       <div className='w-full h-full  py-4 px-8 flex flex-col gap-4 justify-around rounded-xl'>
          <p  className='  text-rich-black-300 text-3xl  flex  gap-4'>Home  / Learning  / <p className='text-yellow-100'>{Course?.courseDetails?.category?.Name}</p></p>
          <div className=' flex w-11/12  h-full  bg-rich-black-700 relative'>
              <div className='w-[70%] flex flex-col gap-5 justify-around min-h-full lg:border-r-[2px] border-gray-500' >
                  <h1 className=' text-gray-300 text-2xl'>The Complete Python Bootcamp From Zero to Hero in Python</h1>
                  <p className='text-sm text-gray-300'>This Python for beginners course will help you to become Zero to Hero. Learn Python Programming in Easy Way.</p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-5">{avgReviewCount }</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className="text-rich-black-400">
                      ({Course?.courseDetails?.RatingReviews.length}  Ratings)
                    </span>
                  </div>
                  <p className="text-rich-black-400 font-[600] font-edu-sa text-lg">{`${Course?.courseDetails?.Instructor.firstname} ${Course?.courseDetails?.Instructor.lastname}`}</p>
              </div>
              <div className='text-white flex  rounded-xl  bg-rich-black-800 flex-col gap-4 w-[30%] left-[75%] absolute'>
                  <img className='rounded-xl' src={Course?.courseDetails?.thumbnail}/>
                  <div className=' flex flex-col gap-4 p-4 '>
                      <h1 className='font-bold text-3xl'>Rs. {Course?.courseDetails?.price}</h1>
                      <button className='bg-yellow-50  text-black p-3 rounded-xl cursor-pointer hover:scale-95 transition-all'>Add to Cart</button>
                      <button className=' bg-gray-600/30 text-white p-3 rounded-xl cursor-pointer hover:scale-95 transition-all'>Buy Now</button>
                      <div className='text-sm flex flex-col gap-1'>
                        <p className='text-gray-300'>Ths Course Includes</p>
                        <ul className=' divide-dotted text-green-400 flex flex-col gap-1 font-edu-sa' >
                          <li className='flex gap-1 justify-start items-center'> <FaRegClock /> <p>Full LifeTime Access</p></li>
                          <li className='flex gap-1 justify-start items-center'><CiMobile1/><p>Access on MObile and TV</p></li>
                          <li className='flex gap-1 justify-start items-center'><PiCertificate/><p>Certificate of Completion</p></li>
                        </ul>
                      </div>
                      <button className='text-yellow-50 cursor-pointer hover:text-yellow-100 transition-colors'> Share</button>
                  </div>
              </div>
          </div>
       </div>
       
    </div>
    <br/>
    <div className='w-ful l flex justify-start   bg-rich-black-900 px-8'>
           <div className='w-11/12 flex flex-col gap-4'>
               <div className='w-[70%]   p-4 text-gray-200 flex flex-col gap-2 border-[0.2px] border-gray-700'  >
                <h1 className='text-2xl text-gray-200 font-mono '>What you'll learn</h1>
                 {Course?.courseDetails?.WhatLearn}
               </div>
               <div className=' p-4 w-[70%] flex flex-col gap-3 text-white text-[12px]'>
                  <h1 className='text-2xl font-mono'>Course Content</h1>
                  <p className='flex gap-5'>{Course?.courseDetails?.CourseContent.length} Lectures<p> {Course?.totalDuration} duration</p></p>
               </div>
               <CourseContentView Course={Course?.courseDetails} />

              <div className=' flex flex-col gap-5 w-[70%] '>
                <h2 className=' text-white font-bold text-3xl'>Author</h2>
                <div className='flex gap-3'><img className='rounded-[50%] ' src={Course?.courseDetails?.Instructor?.Image} height={60} width={60}/> <p className=' text-2xl text-gray-300 flex items-center gap1'>{Course?.courseDetails?.Instructor?.firstname} {Course?.courseDetails?.Instructor?.lastname}</p>
                </div>
                <p className='text-gray-400 text-wrap' >{Course?.courseDetails?.Instructor?.AdditionalDetails?.About}</p>
              </div>
           </div>
      </div>
    <Footer/>
  </div>
  )
}

export default CourseDetails