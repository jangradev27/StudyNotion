import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operation/profile';
import { apiConnector } from '../../../services/apiconnector';
import { CourseApi } from '../../../services/api';
import ProgressBar from '@ramonak/react-progress-bar'

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
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[]);


    return(
        <div className='text-white w-full min-h-[calc(100vh-3.5rem)]  flex flex-col  justify-around items-center '>
            <div>
                Enrolled Courses
            </div>
            {
                !EnrolledCourses?(<div className='spinner'>
                    
                </div>):!EnrolledCourses.length?(<p>You have not enrolled in any course yet</p>):(<div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>progress</p>
                    </div>    
                    {/* cards logic */}
                    {
                        EnrolledCourses.map((course,index)=><div>
                            <div>
                                <div>
                                    <img src={course.thumbnail}/>
                                </div>
                                <div>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.courseDescripton}</p>
                                </div>
                            </div>
                            <div>
                                {course?.totalDuration}
                            </div>
                            <div>
                                <p>Progess: {course.progressPercentage || 0}%</p>
                                <ProgressBar completed={course.progressPercentage || 0} maxCompleted={100} height='8px' isLabelVisible={false}/>
                            </div>
                        </div>)
                    }
                    
                </div>)
            }
        </div>
    )
    
 
}

export default EnrolledCourses