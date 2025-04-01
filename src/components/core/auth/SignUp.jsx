import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AccType } from '../../../utils/constants';
import Studentsign from "../../../assets/Images/signup.webp";
import InstructorHome from "../../../assets/Images/instructorauth.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../../slices/authSlice';
import { SendOtp } from '../../../services/operation/Auth';
import toast from 'react-hot-toast';

const BUTTONS = [
  { title: "Student", AccountType: "Student" },
  { title: "Instructor", AccountType: "Instructor" }
];

export const SignUpForm = ({ setImage }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { AccountType: AccType.Student,otp:null }
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isShow, setShow] = useState(false);
  const [isConfirmShow, setConfirmShow] = useState(false);

  const handleChange = (accountType, index) => {
    setSelectedIndex(index);
    setValue("AccountType", accountType);
    setImage(accountType === AccType.Instructor ? InstructorHome : Studentsign);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    const {password,confirmPassword}=data
    if(password!==confirmPassword){
      toast.error("Password Mismatched");
      return;
    }
    dispatch(setFormData(data));  
    dispatch(SendOtp(data,navigate,));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 overflow-x-hidden">
      {/* Account Type Selection */}
      <div className="flex bg-rich-black-800 shadow-[0px_2px_0px] shadow-white justify-around h-[44px] w-[230px] rounded-[5rem] items-center">
        {BUTTONS.map((element, index) => (
          <button
            key={element.AccountType}
            type="button"
            onClick={() => handleChange(element.AccountType, index)}
            className={`${selectedIndex === index ? "text-white bg-rich-black-900" : "text-rich-black-200"}
              w-[100px] h-[22px] p-4 transition-all duration-300 font-inter flex justify-center items-center 
              hover:bg-rich-black-900 text-[16px] rounded-3xl`}
          >
            {element.title}
          </button>
        ))}
      </div>

      {/* Name Fields */}
      <div className="flex  flex-col lg:flex-row gap-2">
        <label className="flex flex-col text-rich-black-200 gap-2">
          <p>First Name<sup className="text-red-400">*</sup></p>
          <input type="text" {...register("firstname", { required: "First name is required" })}
            placeholder="Enter Your First Name"
            className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
          />
        </label>
        <label className="flex flex-col text-rich-black-200 gap-2">
          <p>Last Name<sup className="text-red-400">*</sup></p>
          <input type="text" {...register("lastname", { required: "Last name is required" })}
            placeholder="Enter Your Last Name"
            className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
          />
        </label>
      </div>

      {/* Email Input */}
      <label className="  lg:w-[50%] flex flex-col text-rich-black-200 gap-2">
        <p>Email Address<sup className="text-red-400">*</sup></p>
        <input type="email" {...register("email", { required: "Email is required" })}
          placeholder="Enter Your Email"
          className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
        />
      </label>

      {/* Password Fields */}
      <div className="flex flex-col  lg:flex-row gap-4">
        {/* Password */}
        <div>
          <label className="relative flex flex-col text-rich-black-200 gap-2">
            <p>Password<sup className="text-red-400">*</sup></p>
            <div className="relative">
              <input type={isShow ? "text" : "password"} 
                {...register("password", { required: "Password is required" })} 
                placeholder="Enter Your Password"
                className="px-2 outline-none w-full bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
              />
              <button type="button" className="absolute right-3 top-2 h-5" onClick={() => setShow(!isShow)}>
                {isShow ? <FaEyeSlash className="h-full"/> : <FaEye className="h-full"/>}
              </button>
            </div> 
          </label>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="relative flex flex-col text-rich-black-200 gap-2">
            <p>Confirm Password<sup className="text-red-400">*</sup></p>
            <div className="relative">
              <input type={isConfirmShow ? "text" : "password"} 
                {...register("confirmPassword", { required: "Confirm Password is required" })} 
                placeholder="Confirm  Password"
                className="px-2 outline-none w-full bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
              />
              <button type="button" className="absolute right-3 top-2 h-5" onClick={() => setConfirmShow(!isConfirmShow)}>
                {isShow ? <FaEyeSlash className="h-full"/> : <FaEye className="h-full"/>}
              </button>
            </div> 
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="lg:w-[444px] bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md">
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;
