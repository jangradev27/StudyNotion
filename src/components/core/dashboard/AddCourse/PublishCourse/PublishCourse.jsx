import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCourseState, setStep } from '../../../../../slices/Courseslice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operation/Course';

const PublishCourse = () => {
    const {register,handleSubmit,formState:{errors},getValues,setValue}=useForm();
    const {token}=useSelector(state=>state.auth);
    const {course}=useSelector(state=>state.Course);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const gotocourse=()=>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")

    }
    useEffect(()=>{
       if(course?.status===COURSE_STATUS.PUBLISHED){
        setValue("public",true);
       }
    })
    const onsubmit=async(data)=>{
        if((course?.status===COURSE_STATUS.PUBLISHED  && getValues("public")===true) || (course.status===COURSE_STATUS.DRAFT && getValues('public')===false )){
            gotocourse();
            return;
        }
        const formdata=new FormData();
        formdata.append("CourseId",course._id);
        const status=getValues("public")?COURSE_STATUS.PUBLISHED:COURSE_STATUS.DRAFT;   
        formdata.append("status",status);
        const result=await editCourseDetails(formdata,token);
        if(result){
            gotocourse();

        }

    }

    const Goback=()=>{
        dispatch(setStep(2));
    }
  return (
    <div className=' w-full  flex justify-center items-center min-h-[13rem]'>
        <form onSubmit={handleSubmit(onsubmit)} className=' w-[40rem] bg-rich-black-700 flex flex-col justify-around px-4 p-2 rounded-xl h-full'>
            <h1 className='text-2xl text-rich-black-50 font-bold '>Publish Settings</h1>
            <div className='flex gap-2 justify-start items-center'>
                 <input type='checkbox' id='Check' className='w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2' {...register("public",{required:true})} />
                 <label htmlFor='Check' className='text-rich-black-50 text-lg' >Make This Course Public</label>
            </div>
            <div className='w-full flex justify-end gap-5'>
                <IconBtn text={"Back"} customClasses={"bg-rich-black-400 p-2 px-4 w-fit font-[600] cursor-pointer rounded-lg  hover:scale-95 transition-all"} type={"button"} onclick={Goback} />
                <IconBtn text={"Save Changes"} customClasses={"bg-yellow-200 p-2 px-4 w-fit font-[600] cursor-pointer rounded-lg hover:scale-95 transition-all"} type={"submit"}/>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse