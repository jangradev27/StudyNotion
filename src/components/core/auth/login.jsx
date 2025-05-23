import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AccType } from "../../../utils/constants.jsx";
import StudentHome from "../../../assets/Images/login.webp";
import InstructorHome from "../../../assets/Images/instructorauth.png"; // Assuming an image for 
// Instructor
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operation/Auth.js";
import { useDispatch } from "react-redux";

const BUTTONS=[{
  title:"Student",
  AccountType:"Student"
},
{
   title:"Instructor",
  AccountType:"Instructor"
}
]

export const LoginForm = ({ setImage }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      AccountType: AccType.Student, // Default is Student
    },
  });
  const[selectedIndex,SetIndex]=useState(0);
  const[isShow,setShow]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange = (accountType,index) => {
    SetIndex(index);
    setValue("AccountType", accountType);
    setImage(accountType === AccType.Instructor ? InstructorHome : StudentHome);
  };

  const onSubmit = (data) => {
    console.log(data)
    dispatch(login(data,navigate));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-10  overflow-x-hidden">
      {/* Account Type Selection */}
      <div className="flex bg-rich-black-800 shadow-[0px_2px_0px] shadow-rich-black-50 justify-around  h-[44px] w-[230px]  rounded-[5rem] items-center ">
          {
            BUTTONS.map((element,index)=><button type="button" key={index} onClick={()=>{handleChange(element.AccountType,index)}} 
              className={`${selectedIndex===index?  "text-white bg-rich-black-900":"text-rich-black-200" } w-[100px] h-[22px] p-4 transition-all duration-300  font-inter flex justify-center items-center hover:bg-rich-black-900   text-[16px] rounded-3xl  `}
            >{element.title}</button>)
          }
      </div>
      <label className=" flex flex-col text-rich-black-200 gap-2">
        <p className="flex gap-[2px] items-center" >Email Address<sup className=" text-red-400 relative top-[1px]">*</sup></p>
        <input type="email" {...register("email",{required:"email is required"})} placeholder="Enter Your Email"
          className=" px-2 outline-none bg-rich-black-800 h-[2.5rem] md:w-[444px] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
        />
      </label>

        <div>
          <label className=" relative flex flex-col text-rich-black-200 gap-2">
            <p className="flex gap-[2px] items-center" >Password<sup className=" text-red-400 relative top-[1px]">*</sup></p>
            
            <div className="flex relative md:w-[444px]">
                <input type={`${isShow?"text":"password"}`} {...register("password",{required:"password is required"})} placeholder="Enter Your Password"
                  className="  px-2 outline-none w-full bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                />
                <sub className="absolute z-[2] left-[59%] sm:left-[75%] w-[10rem] translate-y-2"><Link to={"Forgot-Password"} className="text-blue-200">Forgot Password</Link></sub>  
                <button type="button" className="absolute z-[2] left-[90%] md:left-[95%] top-2 h-5" onClick={()=>setShow(!isShow)}>
                  {isShow? (<FaEyeSlash className="h-full"/>):(<FaEye className="h-full"/>)}
                </button>
            
            </div> 
          </label>

          
        </div>

        <button type="submit" className="md:w-[444px] bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md ">Sign in</button>



      
    </form>
  );
};

export default LoginForm;
