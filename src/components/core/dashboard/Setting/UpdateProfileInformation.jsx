import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UpdateUserName } from '../../../../services/operation/profile'
import { UpdateProfile } from '../../../../services/operation/profile'



const GenderOptions=[
   "Male","Female","Non-Binary","Prefer Not to Say","Others"
]

const UpdateProfileInformation = () => {
    const {token}=useSelector(state=>state.auth)
    const {profile:user,profileData}=useSelector(state=>state.profile);
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch();
   
    const onsubmit=async(data)=>{
        if(data.DOB !==profileData.DOB || data.Gender !==profileData.Gender || data.About !==profileData.About){

            dispatch(UpdateProfile(token,data));
        }

        if(data.firstname!==user.firstname || data.lastname!==user.lastname){
             dispatch(UpdateUserName(token,data));
        
     
    }


}

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[90%] flex text-start rounded-lg min-h-[20rem]'>
                <form className='w-full flex flex-col' >
                    <div className=' bg-rich-black-700 w-full p-4 rounded-lg flex flex-col  sm:grid sm:items-center grid-cols-2 grid-rows-4 gap-5'>
                        <h2 className='text-xl  col-span-2 text-white font-[500]'>Profile Information</h2>
                        <label className=" flex flex-col text-rich-black-200 gap-2">
                            <p className="flex gap-[2px] items-center" >FirstName<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                            <input required {...register("firstname",{required:"firstName is required"})} type="text"   defaultValue={user?.firstname}
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem]  rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                            />
                        </label>

                        <label className=" flex flex-col text-rich-black-200 gap-2">
                            <p className="flex gap-[2px] items-center" >LastName<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                            <input required type="text"   defaultValue={user?.lastname} {...register("lastname",{required:"last name is required"})}
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem]  rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                            />
                        </label>
                        <label className=" flex flex-col text-rich-black-200 gap-2">
                            <p className="flex gap-[2px] items-center" >Date Of Birth<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                            <input required type="date" defaultValue={profileData?.DOB? profileData.DOB:""} {...register("DOB",{required:"DOB is required"})}
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem]   rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                            />
                        </label>
                        <label className=" flex flex-col text-rich-black-200 gap-2">
                            <p className="flex gap-[2px] items-center" >Gender<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                            <select required type="email"  defaultValue={profileData?.Gender? profileData.Gender:""} {...register("Gender",{required:"Gender is required"})}
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem]  rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                            >
                                {
                                    GenderOptions.map((ele,index)=><option key={index}>{ele}</option>)
                                }
                            </select>
                        </label>
                        <label className="  flex flex-col  col-span-2 text-rich-black-200 gap-2">
                            <p className="flex gap-[2px] items-center" >About<sup className=" text-red-400 relative top-[1px]">*</sup></p>
                            <input required type="text" defaultValue={profileData?.About? profileData.About:""} {...register("About",{required:"About is required"})}
                            className=" px-2 outline-none bg-rich-black-800 h-[2.5rem]  rounded-md shadow-rich-black-5 shadow-[0px_1px_0px]"
                            />
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

export default UpdateProfileInformation;