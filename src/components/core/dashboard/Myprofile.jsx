import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";



const Myprofile = () => {
    const{profile:user,profileData}=useSelector(state=>state.profile);
    console.log(profileData)
    const navigate=useNavigate();
  return (
    <div className='w-full min-h-screen px-4 flex flex-col justify-around gap-10'>
        <h1 className='text-3xl text-white w-full '>My Profile</h1>

        {/* section1 */}
        <div className='w-full flex justify-center items-center'>
            <div className='bg-rich-black-700 flex items-center justify-around rounded-lg w-[90%] ' >
                <div className='flex w-[80%] h-[7rem] justify-around gap-5 items-center '>
                    <img src={user?.Image} alt={`profile-${user?.firstname}`}
                    className='aspect-square w-[4rem] h-[4rem] rounded-full object-cover'></img>
                    <div className='w-full '>
                        <p className='font-bold text-rich-black-50  text-2xl '>{user?.firstname + " " +user?.lastname}</p>
                        <p className='text-rich-black-300'>{user?.email}</p>
                    </div>
                </div>
                <IconBtn text={"Edit"} icon={<TbEdit />}  customClasses={` text-lg rounded-xl  transition-all hover:scale-95 cursor-pointer bg-yellow-200 p-2 h-[3rem] flex justify-center items-center gap-2 font-[500] w-[5rem]`}
                    onclick={()=>{navigate("/dashboard/Settings")}}
                />
            </div>
        </div>
        {/* Section2  */}
        <div className='w-full flex justify-center items-center'>
            <div className='bg-rich-black-700 flex items-center justify-around rounded-lg w-[90%] ' >
                <div className='flex flex-col w-[80%] min-h-[7rem] justify-center gap-5 items-start  '>
                    <p className='font-[500] text-rich-black-100 text-2xl'>About</p>
                    {
                        profileData?.About?<p className='font-[500] text-rich-black-200 '>{profileData?.About}</p>:(<p className='font-[500] text-rich-black-200 '>write something about you</p>)
                    }
                </div>
                <IconBtn text={"Edit"} icon={<TbEdit />}  customClasses={` text-lg rounded-xl  transition-all hover:scale-95 cursor-pointer bg-yellow-200 p-2 h-[3rem] flex justify-center items-center gap-2 font-[500] w-[5rem]`}
                    onclick={()=>{navigate("/dashboard/Settings")}}
                />
            </div>
           
        </div>


        {/* section 3 */}
        <div className='w-full  flex justify-center   '>
            <div className='bg-rich-black-700 flex flex-col justify-around items-center   rounded-lg w-[90%] min-h-[18rem]'>
                <div className='flex justify-between items-center  w-[93.9%]   '>
                    <p className='w-[50%] font-bold text-white text-xl'>Personal Details</p>
                    <IconBtn text={"Edit"} icon={<TbEdit />}  customClasses={` text-lg rounded-xl  transition-all hover:scale-95 cursor-pointer bg-yellow-200 p-2 h-[3rem] flex justify-center items-center gap-2 font-[500] w-[5rem]`}
                    onclick={()=>{navigate("/dashboard/Settings")}}
                />
                </div>
                <div className='flex w-[95%] flex-col justify-around gap-10 p-2'>
                    <div className='flex justify-between'>
                       <div className='w-[50%] justify-start'>
                            <p className='text-rich-black-200 text-sm font-[500]'>FirstName</p>
                            <h1 className='text-gray-300 text-lg'>{user?.firstname}</h1>
                       </div>

                       <div className='w-[50%] justify-start'>
                            <p className='text-rich-black-200 text-sm font-[500]'>LastName</p>
                            <h1 className='text-gray-300 text-lg'>{user?.lastname}</h1>
                       </div>
                    </div>
                    <div className='flex justify-between  '>
                        <div className='flex flex-col justify-start w-[50%] '>
                            <p className='text-rich-black-200 text-sm font-[500]'>Email</p>
                            <h1 className='text-gray-300 text-lg'>{user?.email}</h1>
                        </div>
                        <div className='flex flex-col  justify-start w-[50%] text-gray-300 text-lg '>
                            <p className='text-rich-black-200 text-sm font-[500]'>Date Of Birth</p>
                            {
                                profileData.DOB?(<time dateTime={profileData.DOB}>{new Date(profileData.DOB).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</time>):(<p>Enter Date of birth</p>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Myprofile;