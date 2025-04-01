import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/dashboard/sidebar';

const Dashboard = () => {
    const {Loading:authLoading}=useSelector(state=>state.auth);
    const {Loading:profileLoading}=useSelector(state=>state.profile);
    console.log(authLoading,profileLoading);
    if(authLoading || profileLoading){
        return <div className='spinner' >

        </div>
    }
  return (
    <div className='w-full flex min-h-screen'>
       
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto' >
            <div className='mx-auto w-11'>

            </div>
        </div>

    </div>
  )
}

export default Dashboard