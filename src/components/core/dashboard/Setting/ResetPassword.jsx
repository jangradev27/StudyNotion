import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEyeSlash,FaEye } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { changePassword } from '../../../../services/operation/profile';
const ResetPassword = () => {
  const [isShow,setShow]=useState(false);
  const[NewShow,SetNewShow]=useState(false)
  const {register,handleSubmit,reset,formState:{isSubmitSuccessful}}=useForm();
  const dispatch=useDispatch()
  const {token}=useSelector(state=>state.auth)
  
  
  
  const onsubmit=(data)=>{
    console.log(data)
    if(data.password && data.ResetPassword)
    dispatch(changePassword(token,data)).then(()=> toast.success("Password changes SuccessFully"));
  else
    toast.error("please enter the required field")
  }
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        password:"",
        NewPassword:""
      })}
  },[isSubmitSuccessful,reset]);
  return (
    <div className='w-full flex justify-center items-center  '>
        <div className='w-[90%]  '>
           <form className="flex w-full min-h-[10rem] flex-col ">
                 {/* Password */}
                <div className=' p-4 w-full bg-rich-black-700 rounded-lg md:items-center flex flex-col md:grid grid-cols-2 grid-rows-2 gap-2'>
                     <p className='col-span-2 text-xl text-white  font-[500]'>Password</p>
                   <label className="relative flex flex-col text-rich-black-200 gap-2">
                     <p>Current Password</p>
                     <div className="relative">
                       <input type={isShow ? "text" : "password"} 
                        {...register("password")} required
                         placeholder="Enter Your Password"
                         className="px-2 outline-none w-full bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                       />
                       <button type="button" className="absolute right-3 top-2 h-5" onClick={() => setShow(!isShow)}>
                         {isShow ? <FaEyeSlash className="h-full"/> : <FaEye className="h-full"/>}
                       </button>
                     </div> 
                   </label>
                   <label className="relative flex flex-col text-rich-black-200 gap-2">
                     <p>New Password</p>
                     <div className="relative">
                       <input type={NewShow ? "text" : "password"} 
                        {...register("NewPassword")}
                         placeholder="Enter Your Password"
                         className="px-2 outline-none w-full bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                       />
                       <button type="button" className="absolute right-3 top-2 h-5" onClick={() => SetNewShow(!NewShow)}>
                         {NewShow? <FaEyeSlash className="h-full"/> : <FaEye className="h-full"/>}
                       </button>
                     </div> 
                   </label>
                 
                </div>
                <div className=' w-full flex justify-end p-2'>
                       <div className='flex justify-around gap-5 items-center min-w-[10rem] p-2'>
                        <NavLink to={"/dashboard/my-profile"} className=" p-2 w-[5rem] hover:scale-95 transition-all cursor-pointer rounded-lg text-xl font-[500] bg-rich-black-700 text-rich-black-300">
                                Cancel
                            </NavLink>
                            <button type='submit' onClick={handleSubmit(onsubmit)} className= 'hover:scale-95 transition-all cursor-pointer bg-yellow-200 w-[5rem] p-2 text-xl font-[500] rounded-lg' >
                                Save
                            </button>
                       </div>
                  </div>
                
            </form>

        </div>
    </div>
  )
}

export default ResetPassword