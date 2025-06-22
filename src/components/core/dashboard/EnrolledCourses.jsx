import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operation/profile';
import { apiConnector } from '../../../services/apiconnector';
import { CourseApi } from '../../../services/api';
import ProgressBar from '@ramonak/react-progress-bar'
import { NavLink } from 'react-router-dom';

const {getUserEnrolledCourses_api}=CourseApi
const EnrolledCourses = () => {
    const{token}=useSelector(state=>state.auth);
    
    const [EnrolledCourses,setEnrolledCourses]=useState(null);
    const getEnrolledCourses=async()=>{
        console.log("Started");
        try{
            const response= await getUserEnrolledCourses(token);
            console.log(response);
            setEnrolledCourses(response)
            // const a=[{
            //     thumbnail:"https://res.cloudinary.com/dgrtpvmnf/image/upload/v1744558087/StudyNotionProfilePic/crr6f0w7raks7frtmgvw.jpg",
            //     courseName:"devjangra",
            //     courseDescripton:"asflasdnfasdnflnasdnfsa",
            //     progressPercentage:60,
            //     totalDuration:"2hr 30 mins"

            // }]
            // setEnrolledCourses(a);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[]);


    return(
        <div className='text-white w-full min-h-[calc(100vh-3.5rem)] p-2 flex flex-col  justify-start gap-10 '>
            <div className=' text-3xl p-3'>
                Enrolled Courses
            </div>
            {
                !EnrolledCourses?(<div className='flex w-full h-full justify-center items-center'>
                    <div className='spinner'>
                    </div>
                </div>):!EnrolledCourses.length?(<p>You have not enrolled in any course yet</p>):(<div className=''>
                    <div className='flex h-[3rem]  bg-rich-black-700 rounded-[10px_10px_0_0] '>
                        <div className='w-[50%]  flex items-center p-3 text-rich-black-100 '>
                            Course Name
                        </div>
                        <div className='w-[50%] flex  text-rich-black-100'>
                            <div className='w-[50%] flex items-center p-3 h-full'>Duration</div>
                            <div className='w-[50%] flex items-center p-3 '>progress</div>
                        </div>
                        
                    </div>    
                    {/* cards logic */}
                    {
                        EnrolledCourses.map((course,index)=><NavLink to={"/"} className=' p-2 border-t-0 border-1 border-rich-black-500 min-h-[5rem] flex'>
                            
                            <div className='flex w-[50%]  gap-4 p-3'>
                                <div className='w-[4rem] h-[4rem] rounded-xl'>
                                    <img src={course.thumbnail} className='rounded-xl w-[4rem] h-[4rem]'/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>{course?.courseName}</p>
                                    <p className='text-rich-black-100'>{course?.courseDescripton}</p>
                                </div>
                            </div>
                            <div className='p-3 w-[25%] flex items-center text-rich-black-50 '>
                                {course?.totalDuration}
                            </div>
                            <div className='p-3 w-[25%] flex flex-col justify-center  '>
                                <p className='text-rich-black-50'>Progess: {course.progressPercentage || 0}%</p>
                                <ProgressBar completed={course.progressPercentage || 0} maxCompleted={100} width='9rem' height='8px' isLabelVisible={false}/>
                            </div>
                        </NavLink>)
                    }
                    
                </div>)
            }
        </div>
    )
    
 
}

export default EnrolledCourses