import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { CreateSubSection, EditCourseSubsectionData } from '../../../../../services/operation/Course';
import { setCourse } from '../../../../../slices/Courseslice';

import toast from 'react-hot-toast';

const SubSectionModal = ({modalData, setModalData, add = false, view = false, edit = false}) => {
  const {register, handleSubmit, formState: {errors}, setValue, getValues} = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(state => state.auth);
  const {course} = useSelector(state => state.Course);
  console.log(modalData)
  useEffect(() => {
    if(view || edit){
      setValue('title', modalData.title);
      setValue('description', modalData.description);
      setValue("lecturevideo", modalData.VideoUrl); // Fixed: use consistent field name
    }
  }, [view, edit, modalData, setValue])
  
  const handleEditSubsection = async() => {
    console.log("Started editing subsection");
    setLoading(true);
    
    try {
      const currentValue = getValues();
      const formdata = new FormData();
      
      // FIXED: Add subsection ID
      formdata.append("SectionId", modalData.sectionid);
      formdata.append("SubSectionId",modalData._id)
      
      if(currentValue.title !== modalData.title){
        formdata.append("title", currentValue.title);
      }
      if(currentValue.description !== modalData.description){
        formdata.append("description", currentValue.description);
      }
      if(currentValue.lecturevideo !== modalData.VideoUrl){
        formdata.append("Video", currentValue.lecturevideo);
      }
      
      const result = await EditCourseSubsectionData(formdata, token);
      console.log(result);
      if(result){
        // FIXED: Update the correct section that contains this subsection
        const updatedCourseContent = course.CourseContent.map((section) =>section._id===modalData.sectionid?result:section
          
        );

        console.log(updatedCourseContent);
        const updatedCourse = {...course, CourseContent: updatedCourseContent};
        dispatch(setCourse(updatedCourse));
        
      }
      
    } catch (error) {
      console.error("Error editing subsection:", error);
      toast.error("Failed to update subsection");
    } finally {
      setLoading(false);
      setModalData(null);
    }
  }
  
  const isFormUpdated = () => {
   const currentValue=getValues();
    
    return (
      currentValue.title !== modalData.title || 
      currentValue.description !== modalData.description || 
      currentValue.lecturevideo !== modalData.VideoUrl
    );
  }
  
  const onsubmit = async(data) => {
    
    if(view){
      return;
    }
    
    if(edit){
      const formUpdated = isFormUpdated();
     
      
      if(!formUpdated){
        toast.error("No changes made to the form");
        return;
      }
      
      await handleEditSubsection();
      return;
    }

    
    setLoading(true);
    
    try {
      const formdata = new FormData();
      formdata.append("SectionID", modalData);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("Video", data.lecturevideo);
      
      const result = await CreateSubSection(formdata, token);
      
      if(result){
        const updatedSection = course.CourseContent.map((section) => 
          section._id === modalData ? result : section
        );
        const updatedCourse = {...course, CourseContent: updatedSection};
        dispatch(setCourse(updatedCourse));
        toast.success("Subsection added successfully");
      }
      
    } catch (error) {
      console.error("Error creating subsection:", error);
      toast.error("Failed to create subsection");
    } 
      setLoading(false);
      setModalData(null);
    
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid min-h-screen w-full place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm p-4'>
      <div className='w-[50%] rounded-lg bg-rich-black-800 h-full items-center flex flex-col justify-between gap-10'>
        <div className='rounded-[10px_10px_0_0] p-[2%] w-full flex justify-between text-3xl text-rich-black-50 bg-rich-black-600'>
          <p> {view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture </p>
          <button 
            type='button' 
            onClick={() => !loading && setModalData(null)}
            disabled={loading}
          >
            <RxCross2/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onsubmit)} className='w-11/12 h-full flex flex-col justify-between gap-5 p-[4%]'>
          <Upload 
            name={'lecturevideo'} 
            label={"Lecture Video"}
            register={register}
            setValue={setValue}
            getValues={getValues}
            video={true}
            viewData={view ? modalData.VideoUrl : null}
            editData={edit ? modalData.VideoUrl : null}
          />
          
          <div className='flex flex-col text-lg gap-5 text-rich-black-50'>
            <label htmlFor='title'>Lecture Title</label>
            <input 
              className='outline-none p-2 rounded-lg bg-rich-black-600 h-[3rem]' 
              id='title' 
              {...register("title", {required: true})} 
              placeholder='Enter the lecture Title'
              disabled={view}
            />
            {errors.title && <p className='text-sm text-red-500'>Lecture Title is required</p>}
          </div>

          <div className='flex flex-col text-lg gap-5 text-rich-black-50'>
            <label>Lecture Description</label>
            <textarea 
              className='outline-none p-2 rounded-lg bg-rich-black-600 h-[8rem]' 
              {...register("description", {required: true})} 
              placeholder='Enter the Lecture Description'
              disabled={view}
            />
            {/* FIXED: corrected typo from 'descripttion' to 'description' */}
            {errors.description && <p className='text-sm text-red-500'>Lecture Description is required</p>}
          </div>

          {!view && (
            <div className='w-full flex justify-end'>
              <IconBtn 
                type={"submit"} 
                customClasses={"w-fit bg-yellow-200 p-2 text-black font-semibold rounded-xl hover:scale-95 transition-all cursor-pointer"} 
                text={loading ? "Processing..." : (edit ? "Save Changes" : "Add Lecture")}
                disabled={loading}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal