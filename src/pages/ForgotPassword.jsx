import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SendOtp } from '../services/operation/Auth';
import { ResetPasswordToken } from '../services/operation/Auth';
const ForgotPassword = () => {
    const {register,handleSubmit}=useForm();
    const {Loading}=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const [emailSent,setEmailSent]=useState(false)
    const [email,setEmail]=useState("");

    const onSubmit=(data)=>{
        dispatch(ResetPasswordToken(data,setEmailSent))
        setEmail(data.email);
        
    }
    
  return (
    <div className='  flex justify-center items-center min-h-screen '>
           {
                Loading? (<div className='spinner'></div>):(<div className=' p-2 flex flex-col gap-5 w-[30rem]  '>
                    <h1 className=' text-3xl text-white font-bold'>
                        {
                            !emailSent? "Reset You Password":"Check Mail"
                        }
                    </h1>
                    <p className='text-rich-black-100'>{
                        !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to your email ${email}`
                        }   
                    </p>
                    {
                        <form  onSubmit={handleSubmit(onSubmit)}>
                          { !emailSent? <div className='flex flex-col gap-5'>
                              <label className=" flex flex-col text-rich-black-200 gap-2">
                                <p className="flex gap-[2px] items-center" >Email Address<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                                <input type="email" {...register("email",{required:"email is required"})} placeholder="Enter Your Email"
                                  className=" px-2 outline-none bg-rich-black-800 h-[2.5rem] w-full rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                                />
                              </label>
                              <button type="submit" className=" w-full bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md ">Reset Password</button>


                           </div>:<button type='submit' className=" w-full bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md ">Resend Mail</button>}
                        </form>
                    }
                    <Link  to={"/login"}>
                        <div className='flex gap-2 text-white  items-center'>
                                <FaLongArrowAltLeft/>
                                <p>Back to login</p>
                        </div>
                    </Link>
                </div>)
           } 
    </div>
  )
}

export default ForgotPassword