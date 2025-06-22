import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TimeDisplay from '../../../common/TimeDisplay';
import { TbSquareRoundedCheck } from 'react-icons/tb';
import { MdDeleteForever, MdDeleteOutline } from "react-icons/md";
import CTAButton from '../../Homepage/CTAButton';
import { getInstructorCourses } from '../../../../services/operation/Course';
const CourseData = [{
  CourseName: "Introduction to Design",
  CourseDescription: "This course provides an overview of the design process, design thinking, and basic design principles.",
  status: "Published",
  CreatedAt:"2023-04-27T17:15:00.000Z",
  Duration: "20h 10m",
  price: "₹520",
  thumbnail: "https://res.cloudinary.com/dgrtpvmnf/image/upload/v1748760467/tawcwwindbgh9flwsqbw.jpg", // replace with actual URL if needed
}];


const InstructorCourse = () => {
  
  const{Loading,token}=useSelector(state=>state.auth);

  const[Courses,setCourses]=useState([]);
  const getData=async()=>{
    const response=await getInstructorCourses(token);
    setCourses(response);
    console.log(response)
  }

  const EditButton=()=>{
    console.log("edit button clicked");
  }

  const Deletebutton=()=>{
    console.log("delete button clicked");
  }
  

  useEffect(()=>{
    getData();
    
  },[])

  return (
     <div className='text-white w-full min-h-[calc(100vh-3.5rem)] p-2 flex flex-col  justify-start gap-10 '>
            <div className=' text-3xl p-3 flex justify-between'>
                <div>My Courses</div>
                <CTAButton children={"New"} active={true} linkTo={"/CreateCourse"}/>
            </div>
            {
                Loading?(<div className='flex w-full h-full justify-center items-center'>
                    <div className='spinner'>
                    </div>
                </div>):!Courses.length?(<p className='w-full text-center'>No Course Created yet</p>):(
                  <div className='  border-[1px] border-rich-black-500 rounded-[10px_10px_0_0] '>
                     <table className=' w-full   '>
                        <thead >
                          <tr className= ' text-rich-black-100 rounded-[10px_10px_0_0]  h-[3rem] '>
                            <th className='w-[60%]  p-2 text-start rounded-[10px_0px_0_0] bg-rich-black-800'>Courses</th>
                            <th className=' bg-rich-black-800'>Duration</th>
                            <th className=' bg-rich-black-800'>Price</th>
                            <th className='rounded-[0px_10px_0_0] bg-rich-black-800'>Actions</th>
                          </tr>
                        </thead>


                        {
                          Courses.map((course,index)=><tr key={index} className="p-2  h-full w-full">
                                  <td className='w-[60%] p-2 '>
                                    <div className='flex  gap-3'>
                                      <img className='w-[18rem] h-[10rem] rounded-lg' src={course.thumbnail}/>
                                      <div className='flex gap-3 flex-col'>
                                        <h1 className='text-lg font-semibold font-mono'>{course.CourseName}</h1>
                                        <p className='text-[13px] text-rich-black-200 font-edu-sa'>{course.CourseDescription}</p>
                                        <TimeDisplay date={course.CreatedAt} style={"text-[12px] text-rich-black-50"}/>
                                        <span className={`${course.status==="Published"?"text-yellow-25":" text-red-500"} w-fit px-2  text-sm flex items-center bg-rich-black-600 rounded-xl`}> 
                                            {course.status=="Published"?<TbSquareRoundedCheck/>:<XCircleIcon/>}
                                            {course.status}
                                        </span>
                                      </div>
                                      
                                    </div>
                                  </td>
                                  <td className='  text-center'>
                                    {course.Duration}
                                  </td>
                                  <td className='text-center'>
                                    {course.price}
                                  </td>
                                  <td className=' text-center'>
                                    <div className=' flex justify-center items-center gap-2'>
                                      <button className='cursor-pointer' onClick={EditButton}>
                                        <Edit2Icon/>
                                    </button>
                                    <button className=' text-2xl cursor-pointer' onClick={Deletebutton}>
                                        <MdDeleteForever/>
                                    </button>
                                    </div>
                                  </td>
                          </tr>)
                        }
                    </table>
                  </div>
                )
            }
        </div>
  )
}

export default InstructorCourse