import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { apiConnector } from '../../../../../services/apiconnector';
import { categories } from '../../../../../services/api';
import ChipInput from "./ChipInput";
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { setCourse, setStep } from "../../../../../slices/Courseslice";
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails } from '../../../../../services/operation/Course';
import toast from 'react-hot-toast';

const CourseInformationForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const { course, editCourse, step } = useSelector(state => state.Course);
  const { token } = useSelector(state => state.auth);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
      setCategory(result.data.Data);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
    }
  };


  useEffect(() => {
    if (editCourse) {
      setValue("CourseName", course?.CourseName);
      setValue("CourseDescription", course?.CourseDescription);
      setValue("price", course?.price);
      setValue("tag", course?.tag);
      setValue("WhatLearn", course?.WhatLearn);
      setValue("category", course?.category?.Name);
      setValue("instructions", course?.instructions);
      setValue("thumbnail", course?.thumbnail);
    }
    fetchSubLinks();
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
  
    return (
      currentValue.CourseName !== course.CourseName ||
      currentValue.price !== course.price ||
      currentValue.WhatLearn !== course.WhatLearn ||
      currentValue.instructions.toString() !== course.instructions.toString() ||
      currentValue.CourseDescription !== course.CourseDescription ||
      currentValue.tag.toString() !== course.tag.toString() ||
      currentValue.category !== course.category.Name ||
      currentValue.thumbnail !== course.thumbnail
    );
    
  };

 

  const onSubmit = async (data) => {
    if(editCourse){
      if(isFormUpdated()){
        const formdata=new FormData();
        const currentValue=getValues();
        formdata.append("CourseId",course._id);
        if(currentValue.CourseName!==course.CourseName){
          formdata.append("CourseName",data.CourseName);
        }
        if(currentValue.CourseDescription!==course.CourseDescription){
          formdata.append("CourseDescription",data.CourseDescription);

        }
        if(currentValue.category !==course.category){
          formdata.append("category",data.category);
        }
        if(currentValue.tag.toString()!==course.tag.toString()){
          formdata.append("tag",JSON.stringify(data.tag));
        }
        if(currentValue.instructions.toString()!==course.instructions.toString()){
          formdata.append("instructions",JSON.stringify(data.instructions));
        }
        if(currentValue.WhatLearn!==course.WhatLearn){
          formdata.append("WhatLearn",data.WhatLearn);
        }
        if(currentValue.price!==course.price){
          formdata.append("price",data.price);
        }
        if(currentValue.thumbnail!==course.thumbnail){
          formdata.append("thumbnail",data.thumbnail);
        }
        // const result=await
        if(result){
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }

      }
      else{
        toast.error("No Changes Made in form");
      }
      return;
    }

    const formdata=new FormData();
    formdata.append("CourseName",data.CourseName);
    formdata.append("CourseDescription",data.CourseDescription);
    formdata.append("category",data.category);
    formdata.append("tag",JSON.stringify(data.tag));
    formdata.append("instructions",JSON.stringify(data.instructions));
    formdata.append("WhatLearn",data.WhatLearn);
    formdata.append("price",data.price);
    formdata.append("thumbnail",data.thumbnail);
    
    const result=await addCourseDetails(formdata,token) ;
    if(result){
      dispatch(setStep(2));
      dispatch(setCourse(result));

    }

  };

  return (
    <div className='w-full flex justify-center items-center '>
      <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 flex flex-col gap-6 bg-rich-black-800 p-6 rounded-xl'>
        
        {/* Course Name */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='CourseName' className='text-rich-black-50 font-[400] text-lg'>
            Course Name<sup className=' text-red-500'>*</sup>
          </label>
          <input
            id='CourseName'
            placeholder='Enter the Course Title'
            {...register("CourseName", { required: true })}
            className=' bg-rich-black-700 p-2 h-[3rem] text-rich-black-50 rounded-lg shadow-rich-black-25 shadow-[0_1px_0px_0] outline-none'
          />
          {errors.CourseName && <p className='text-red-400 text-sm'>Course Title is Required</p>}
        </div>

        {/* Course Description */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='CourseDescription' className='text-rich-black-200 font-[400] text-lg'>
            Course Description<sup className='text-red-500'>*</sup>
          </label>
          <textarea
            id='CourseDescription'
            {...register("CourseDescription", { required: true })}
            className=' bg-rich-black-700 p-2 h-[6rem] text-rich-black-50 rounded-lg shadow-rich-black-25 shadow-[0_1px_0px_0] outline-none'
            placeholder='Enter the Short Description of Course'
          />
          {errors.CourseDescription && <p className='text-red-400 text-sm'>Course Description is required</p>}
        </div>

        {/* Price */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='Price' className='text-rich-black-200 font-[400] text-lg'>
            Course Price <sup className='text-red-500'>*</sup>
          </label>
          <div className='text-white flex gap-3 bg-rich-black-700 h-[3rem] p-4 items-center shadow-rich-black-25 shadow-[0_1px_0px_0] rounded-lg'>
            <div className=' text-rich-black-100 border-rich-black-200 rounded-full flex justify-center items-center w-6 h-6 border-[2px]'>
              <FaIndianRupeeSign />
            </div>
            <input
              id='Price'
              {...register("price", { required: true })}
              className='w-full outline-none h-full text-rich-black-100'
              placeholder='Enter the Price'
            />
          </div>
          {errors.price && <p className='text-red-400 text-sm'>Price is required</p>}
        </div>

        {/* Category */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='category' className='text-rich-black-200 font-[400] text-lg'>
            Course Category <sup className='text-red-500'>*</sup>
          </label>
          <select
            id="category"
            className="bg-rich-black-700 h-[3rem] outline-none text-rich-black-100 p-2 rounded-lg shadow-rich-black-25 shadow-[0_1px_0px_0]"
            {...register("category", { required: true })}
          >
            <option value="" disabled>Choose Your Category</option>
            {category.map((ele) => (
              <option key={ele?._id} value={ele?._id}>
                {ele?.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <ChipInput
          label="Tags"
          name="tag"
          placeholder="Enter the Tags and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Upload (optional: uncomment when used) */}
        <Upload
          name='thumbnail'
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          getValues={getValues}
            editData={editCourse?course?.thumbnail:null}
        />

        {/* What You Will Learn */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='WhatLearn' className='text-rich-black-200 font-[400] text-lg'>
            Benefits of the Course<sup className='text-red-500'>*</sup>
          </label>
          <textarea
            id='WhatLearn'
            className='min-h-[130px] bg-rich-black-700 rounded-lg p-2 text-rich-black-100 outline-none shadow-rich-black-50 shadow-[0_1px_0_0]'
            placeholder='Enter the benefits of the Course'
            {...register("WhatLearn", { required: true })}
          />
          {errors.WhatLearn && <p className='text-red-400 text-sm'>Benefits Area Can't be empty</p>}
        </div>

        {/* Requirements */}
        <RequirementField
          name="instructions"
          label="Instructions/Requirement"
          register={register}
          getValues={getValues}
          setValue={setValue}
          errors={errors}
        />

        {/* Buttons */}
        <div className='flex gap-3 justify-end'>
          {editCourse && (
            <button
              type="button"
              className="text-yellow-400 underline"
              onClick={() => dispatch(setStep(2))}
            >
              Continue Without Saving
            </button>
          )}
          <button
            type="submit"
           
            className="p-2 bg-yellow-100 rounded-lg font-bold w-fit hover:scale-95 transition-all">{!editCourse ? "Next" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
