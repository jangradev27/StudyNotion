import React, { useState } from 'react'
import LoginForm from './login';
import SignUpForm from './SignUp';
import crossframe from "../../../assets/Images/frame.png"
import StudentHome from "../../../assets/Images/login.webp";
import Studentsign from "../../../assets/Images/signup.webp";
import { useSelector } from 'react-redux';
export const Template = ({formtype,heading,description1,description2}) => { 
  const [image,setImage]=useState(formtype==="login"? StudentHome:Studentsign)
  const {Loading}=useSelector(state=>state.auth);
  console.log()
  return (
    <div className='  flex justify-center items-center min-h-screen   '>
      <div className={` ${Loading?"hidden":"flex"}  w-11/12 max-w-maxContent h-full gap-2 justify-between items-center  p-2 `}>
          <div className=' w-full lg:w-[50%] flex flex-col gap-3  h-full'>
              <h1 className='text-3xl text-rich-black-200'>{heading}</h1>
              <p>
                  <span className="text-rich-black-100 w-full">{description1}</span>
                        <span className="font-edu-sa font-bold italic text-blue-100">
                            {description2}
                        </span>
              </p>
              {
                formtype==="login"?<LoginForm image={image} setImage={setImage}/>:<SignUpForm setImage={setImage} />
              }
          </div>

          <div className='relative lg:w-[500px] lg:h-[450px] hidden lg:flex justify-center items-center '>
              <img src={image} className='absolute z-[2] -top-4 -left-5' />
              <img src={crossframe}/>
          </div>

      </div>
      <div className={`spinner ${Loading?"block":"hidden"} `}></div>
  
    </div>
  )
}
export default Template;