import React from 'react'
import * as Icons from 'react-icons/vsc';
import { matchPath, matchRoutes, NavLink, useLocation } from 'react-router-dom';
const SidebarLink = ({data}) => {
    const Icon=Icons[data.icon];
    const location=useLocation();
    
    const matchroute=(route)=>{
       return matchPath({path:route},location.pathname);
    }
  return (
    <div className='  h-12 w-full  flex flex-col justify-center items-center'>
        <NavLink to={data?.path}
        className={` hover:bg-rich-black-700 transition-colors relative px-5 w-full h-full flex items-center justify-start  text-sm font-medium ${matchroute(data?.path)?"  text-yellow-400 bg-yellow-400/20    ":"text-rich-black-400"}  `}
        >
        <span className={`${matchroute(data?.path)?"opacity-100 ":" opacity-0"} absolute left-0 top-0 h-full w-1 bg-yellow-400 `}></span>
        <div className='flex gap-x-2 items-center justify-center'>
            <Icon className="text-lg"/>
            <span>{data?.name}</span>
        </div>
        </NavLink>
    </div>
  )
}

export default SidebarLink