import React, { useEffect, useState } from 'react'
import Footer from '../components/common/footer'
import { useParams } from 'react-router-dom'
import {apiConnector} from "../services/apiconnector"
import { categories } from '../services/api'
import { getCatalogPageData } from '../services/operation/catalog'
import { setCourse } from '../slices/Courseslice'
import CourseCard from '../components/core/catalog/CourseCard'
import CourseSlider from '../components/core/catalog/CourseSlider'


const Catalog = () => {
  const {catalogName}=useParams();
  const [catalogPageData,setCatalogPageData]=useState(null);
  const [categoryId,setCategoryId]=useState("");
  const [CourseType,setCourseType]=useState(true);

  // fetch all categories
  useEffect(()=>{
    const getCategoryDetails=async()=>{
      const response=await apiConnector("GET",categories.CATEGORIES_API);
      console.log(response);
     
      const categoryId=response.data.Data.filter((cat)=> cat.Name.split(" ").join("-").toLowerCase()===catalogName)[0]._id;
      console.log(categoryId);
      setCategoryId(()=>categoryId)
    }
    getCategoryDetails();
  },[catalogName])
  useEffect(()=>{
   
    const getCatalog=async()=>{
        try{
          const res=await getCatalogPageData(categoryId);
          console.log(res);
          setCatalogPageData(res);
        }
        catch(err){
    
          console.log(err.message);
        
      }
    }
    if(categoryId){

    getCatalog();
  }
  },[categoryId])
  return (
    <div className=' text-white flex flex-col gap-8'>
        <div className=' bg-rich-black-800 py-4 px-8 flex flex-col gap-3'>
          <p className='text-rich-black-300 text-sm'>Home/Catalog/<span>{catalogPageData?.data?.selectedCategory?.Name}</span></p>
          <p className='text-4xl'>{catalogPageData?.data?.selectedCategory?.Name}</p>
          <p className='text-lg text-rich-black-200'> {catalogPageData?.data?.selectedCategory?.description} </p>
        </div>

        <div className=' flex flex-col px-8 py-5 gap-8'>
           
            <div className='flex flex-col gap-3'>
              <div className=' text-3xl text-rich-black-50 font-[600]'>Courses To get you Started</div>
               <div className='flex gap-x-5 '>
                  <button onClick={()=>setCourseType(true)} className={`cursor-pointer ${CourseType?"border-b-yellow-200 border-b-[1px]":""} `} >Most Popular</button>
                  <button onClick={()=>setCourseType(false)} className={`cursor-pointer ${!CourseType?"border-b-yellow-200 border-b-[1px]":""} `}>New</button>
               </div>
               <div className='flex justify-center items-center w-full'>
                  <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
               </div>
            </div>

            <div className='w-full'>
                <p className=' text-3xl font-[600] text-rich-black-50'>Top Course <span> {catalogPageData?.data?.differentCategory?.Name} </span></p>
                <div className='flex justify-center items-center w-full'>
                  <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}  />
                </div>
            </div>

            <div>
                <p>Frequently Bought</p>
                <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
                      {
                        catalogPageData?.data?.mostSellingCourses?.map((course,index)=><CourseCard key={index} course={course} />)
                      }
                </div>
                
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Catalog