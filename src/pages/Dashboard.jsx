import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/sidebar';

const Dashboard = () => {
    const {Loading:authLoading}=useSelector((state)=>state.auth);
    const {Loading:profileLoading}=useSelector((state)=>state.profile);
    if (profileLoading || authLoading) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    
  return (
    <div className='relative flex  min-h-[calc(100vh-3.5rem)]'>
       
        <Sidebar />
        <div className='h-[calc(100vh-3.5rem)] w-full   overflow-auto  ' >
            <div className='mx-auto'>
                <Outlet/>
            </div>
           
        </div>
        
    </div>
  )
}

export default Dashboard