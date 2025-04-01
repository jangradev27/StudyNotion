import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { ResetPassword } from '../services/operation/Auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
const UpdatePassword = () => {
    const[isChanged,setChanged]=useState(false);
    const {Loading}=useSelector(state => state.auth);
    const location=useLocation();  
    const dispatch =useDispatch();
    const {register,handleSubmit}=useForm();
    const onSubmit=(data)=>{
        console.log(data);
       const token =location.pathname.split("/").at(-1);
       console.log(token)
       const newdata={
        ...data,token
       }
        dispatch(ResetPassword(newdata,setChanged))
    }
  return (
    <>
        {
          isChanged?(<div className=' min-h-screen flex justify-center items-center' >
              <div className='flex flex-col gap-5'>
                <h1 className=' text-3xl text-white font-bold'>  
                  Reset Complete!
                </h1>
                <p className='text-rich-black-100'>
                  All done! We have sent an email to your registered Mail.
                </p>
                <Link to={"/login"}>
                    <button  className=" w-full bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md transition-colors ">Return to Login</button>
                </Link>
                <Link  to={"/login"}>
                  <div className='flex gap-2 text-white  items-center'>
                      <FaLongArrowAltLeft/>
                      <p>Back to login</p>
                    </div>
                 </Link>
              </div>
          </div>):(<div className=' min-h-screen flex justify-center items-center'>
            {
                Loading?(<div className='spinner'></div>):(<div >
    
                 <div className='flex flex-col gap-5'>
                  <h1 className=' text-3xl text-white font-bold'>  
                    Choose  new password
                    </h1>
                    <p className='text-rich-black-100'>
                    Almost done. Enter your new password and youre all set.
                    </p>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                        <label className=" flex flex-col text-rich-black-200 gap-2">
                          <p className="flex gap-[2px] items-center" >New Password<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                          <input type="password" {...register("Pass",{required:"email is required"})} placeholder="New Password"
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem] w-full rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                                  />
                        </label>
                        <label className=" flex flex-col text-rich-black-200 gap-2">
                          <p className="flex gap-[2px] items-center" >Confirm Password<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                          <input type="password" {...register("ConfirmPass",{required:"email is required"})} placeholder="Confirm Password"
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem] w-full rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                                  />
                        </label>
                        <button type="submit" className=" w-full bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md transition-colors ">Reset Password</button>
                    </form>
    
                 </div>
    
                </div>)
            }
        </div>)
        }
    </>
  )
}

export default UpdatePassword