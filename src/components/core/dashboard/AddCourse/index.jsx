import React, { useState } from 'react'
import RenderSteps from './RenderSteps'
import { useSelector } from 'react-redux'

const AddCourse = () => {
    const {editCourse}=useSelector(state=>state.Course)
  return (
        <div className='flex justify-around min-w-[30rem] p-2  '>
                <div className=' w-full lg:w-[60%] p-2 flex flex-col gap-10  '>
                    <h1 className='text-3xl text-rich-black-50 text-semibold'>{editCourse?"Edit Course":"Add Course"}</h1>
                    <RenderSteps/>
                 </div>
                { !editCourse && <div className='sticky top-5 w-[24rem] h-[24rem] bg-rich-black-800 rounded-lg hidden lg:flex flex-col justify-around '>
                        <span className='text-rich-black-200 text-2xl font-semibold font-edu-sa  w-full text-start'>⚡Course Upload Tips</span>
                        <div className='px-4 flex justify-center items-center'>
                            <ul className='px-4  text-rich-black-200 pointer-events-auto list-disc text-[13px] flex flex-col gap-3 justify-center   '>
                                <li>Set the Course Price option or make it free.</li>
                                <li>Standard size for the course thumbnail is 1024x576.</li>
                                <li>Video section controls the course overview video.</li>
                                <li>Course Builder is where you create & organize a course.</li>
                                <li> Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                                <li>Information from the Additional Data section shows up on the course single page.</li>
                                <li>Make Announcements to notify any important</li>
                                <li>Notes to all enrolled students at once.</li>
                             </ul>
                        </div>
                 </div>
                 }

            

        </div>
)
}

export default AddCourse