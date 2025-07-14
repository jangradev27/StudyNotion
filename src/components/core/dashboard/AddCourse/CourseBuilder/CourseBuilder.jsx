import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAddCircleOutline } from "react-icons/io";

import { setEditCourse, setStep } from '../../../../../slices/Courseslice';
import NestedView from './NestedView';
import { CreateCourseSection, UpdateCourseSection } from '../../../../../services/operation/Course';
import toast from 'react-hot-toast';

const CourseBuilder = () => {
    const{register,handleSubmit,setValue,getValues,formState:{errors}}=useForm();
    const[editSectionName,setEditSection]=useState(null);
    const {course,editCourse}=useSelector(state=>state.Course);
    const {token}=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const cancelEdit=()=>{
        setEditSection(null);
        setValue("name","")
    }
    const onsubmit=(data)=>{
        const newData={...data,SectionId:editSectionName,Courseid:course._id};
        console.log(newData)
        
        if(editSectionName ){
            dispatch(UpdateCourseSection(newData,token));
        }
        else{
            dispatch(CreateCourseSection(newData,token));
        }
        setEditSection(null)
        setValue("name","");

    }
    const goBack=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    const goToNext=()=>{
        if(course?.CourseContent?.length===0){
            toast.error("Please add atleast one Lecture");
            return;
        }
        if(course.CourseContent.some((section)=>  section?.Subsection?.length===0)){
            toast.error("please Add atleast one lecture in Each section");
            return;
        }
        dispatch(setStep(3));

    }
    const handleChangeEditSection=(SectionId,sectionName)=>{
        
       if(editSectionName===SectionId){
        cancelEdit();
        return;
       }

       setEditSection(SectionId);
       setValue("name",sectionName);
    }

  return (
    <div className=' relative text-white bg-rich-black-800 flex justify-center items-center  p-4 rounded-xl'>
        <div className='w-11/12 px-4 flex flex-col gap-4 relative h-full'>
            <p className='font-semibold text-white text-2xl'>Course Builder</p>
            <form className='flex flex-col justify-around gap-3' onSubmit={handleSubmit(onsubmit)} >
                <div className='flex flex-col gap-2'>
                    <label htmlFor='SectionName' className='text-rich-black-50 font-[400] text-lg'>
                    Section Name<sup className=' text-red-500'>*</sup></label>
                    <input {...register("name",{required:true})}
                        id='SectionName' className='outline-none'
                        placeholder='Add a Section to build your Course'
                    />
                    {
                        errors.name && <p className='text-red-400 text-sm'>Course Title is Required</p>
                    }
                </div>
                <div className=' flex items-end gap-2'>
                    <IconBtn type={"submit"} text={!editSectionName?"Create Section":"Edit Section Name"}
                        customClasses={` cursor-pointer hover:text-yellow-400 transition-all flex justify-center items-center  rounded-xl text-yellow-100 border-[1px] border-yellow-100 font-semibold w-fit py-2 px-3`}
                        icon={<IoMdAddCircleOutline/>}
                    />
                    {
                        editSectionName && <button onClick={cancelEdit} className='text-rich-black-50 underline'>Cancel</button>
                    }
                </div>
            </form>

            {
                course && course.CourseContent.length>0 && (
                    <NestedView handleChangeEditSection={handleChangeEditSection} />
                )
            }

            <div className='flex w-full justify-end gap-2'>
                <button onClick={goBack} className='rounded-lg w-[4rem] text-center p-2 hover:scale-95 transition-all bg-rich-black-500'>Back</button>

                <IconBtn type={"button"} text={"Next"} customClasses={" bg-yellow-50 hover:scale-95 transition-all text-black rounded-lg text0-center p-2 w-[4rem] "} onclick={goToNext} />
            </div>


        </div>

    </div>
  )
}

export default CourseBuilder