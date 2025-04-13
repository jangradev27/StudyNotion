import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { Logout } from '../../../services/operation/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { AccType } from '../../../utils/constants'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useLocation,matchPath } from 'react-router-dom'
import { IoIosSettings } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";


import SidebarLink from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
  const {Loading:profileLoading}=useSelector((state)=>state.profile);
  const {Loading:authLoading ,User:user }=useSelector((state)=>state.auth);
     if (profileLoading || authLoading) {
         return (
           <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
             <div className="spinner"></div>
           </div>
         )
       }
  // const{user}=useSelector((state)=>state.profile);
  const location=useLocation();
  const [modal,setmodal]=useState(null);
  const matchroute=(route)=>{
     return matchPath({path:route},location.pathname);
  }
  const dispatch=useDispatch()
  const navigate=useNavigate();
  useEffect(()=>{
    console.log("aise hi")
  },[user])
  
  console.log(user)
  return (
   <>
     <div className=' border-white py-4 w-[15%] bg-rich-black-800 flex flex-col gap-2'>
        {
          sidebarLinks.map((ele,index)=>{
             

            if(ele.type && user?.AccountType!==ele.type)
              return null;
            
            console.log(ele);
            return(
              <SidebarLink data={ele} key={ele.id}/>
            )


          })
        }
        <div className=' ml-2.5 border-b-[1px] w-11/12 min-h-3  border-b-rich-black-600 '></div>
        <div className='flex flex-col gap-2'>
          <SidebarLink data={{name:"Settings",path:"/dashboard/settings",icon:"VscSettingsGear"}}/>
          <button onClick={()=>setmodal({
            text1:"Are You Sure ?",
            text2:"You Will be Logged Out",
            btn1text:"Logout",
            btn2text:"Cancel",
            btn1handler:()=>dispatch(Logout(navigate)),
            btn2handler:()=>setmodal(null)
          })}
          className='font-medium cursor-pointer text-rich-black-300 transition-colors hover:bg-rich-black-700  h-12 w-full  flex flex-col  px-5 justify-center  '>
         
            <div className='   h-12 w-full  flex justify-start items-center'>
                    
                 
                    <div className='flex gap-x-2 items-center justify-center'>
                        <VscSignOut/>
                        <span>Logout</span>
                    </div>
                    
                </div>
          </button>
        </div>
       

    </div>
    {
      modal && <ConfirmationModal modalData={modal}/>
    }
   </>
  )
}

export default Sidebar