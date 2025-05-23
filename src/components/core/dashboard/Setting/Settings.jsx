import React from 'react'
import UpdatePhoto from './UpdatePhoto'
import UpdateProfileInformation from './UpdateProfileInformation'
import ResetPassword from './ResetPassword'

const Settings = () => {
  return (
    <div className='flex flex-col justify-around gap-10 p-4 min-h-screen fadeinleft '>
        <h1 className='text-white text-3xl '>Edit Profile</h1>
        <UpdatePhoto/>
        <UpdateProfileInformation/>
        <ResetPassword/>
    </div>
  )
}

export default Settings