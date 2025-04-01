import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { Contact } from '../../services/api';
import toast from 'react-hot-toast';
const ContactForm = ({heading,description}) => {
  const [loading,setLoading]=useState(false);
  const{register,handleSubmit,reset,formState:{errors,isSubmitSuccessful} }=useForm();

  const OnSubmit=async(data)=>{
    const toastid=toast.loading("Sending Message...")
    
    try{
      setLoading(true);
      const response=await apiConnector("POST",Contact.ContactUs_Api,data);
     
      
      if(response.data.success){
        toast.success("Message Sent SuccessFully");
      }
    }
    catch(err){
      console.log(err);
    }
    toast.dismiss(toastid)
    
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
      })
    }
  },[reset,isSubmitSuccessful])

  return (
    <div className=' w-screen sm:w-11/12 md:w-[35rem]  flex flex-col justify-center items-center gap-3 px-8 md:p-2
     '>
        <div className='md:px-6'>
         <h1 className='text-3xl text-white'>{heading}</h1>
        </div>
        <p className='text-sm text-rich-black-500'>{description}</p>

        <form className='flex flex-col sm:w-[30rem] gap-5  ' onSubmit={handleSubmit(OnSubmit)} >
            <div className='flex gap-5 w-full flex-col  md:flex-row justify-between '>
              <label className="flex flex-col text-rich-black-200 gap-2">
                <p>First Name<sup className="text-red-400">*</sup></p>
                <input name='firstname' type="text" {...register("firstname", { required: "First name is required" })}
                  placeholder="Enter Your First Name"
                  className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                />
             </label>


              <label className="flex flex-col text-rich-black-200 gap-2">
                <p>Last Name<sup className="text-red-400">*</sup></p>
                <input name='lastname' type="text" {...register("lastname", { required: "Last name is required" })}
                  placeholder="Enter Your Last Name"
                  className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                />
              </label>

            </div>

            <label className="flex flex-col text-rich-black-200 gap-2">
                <p>Email Address<sup className="text-red-400">*</sup></p>
                <input name='email' type="text" {...register("email", { required: "Last name is required" })}
                  placeholder="Enter Your Email"
                  className="px-2 outline-none bg-rich-black-800 h-[2.5rem] rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                />
            </label>

            <label className="flex flex-col text-rich-black-200 gap-2">
                <p>Message<sup className="text-red-400">*</sup></p>
                <textarea name='message' cols={30} rows={7} {...register("message", { required: "Last name is required" })}
                  placeholder="Enter Message"
                  className="px-2 outline-none  bg-rich-black-800  rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                />
            </label>
            <button type='submit' className='w-full bg-yellow-200 hover:bg-yellow-300 rounded-md font-semibold transition-colors text-2xl'>Send Message</button>
        </form>
    </div>
  )
}

export default ContactForm;