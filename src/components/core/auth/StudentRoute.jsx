import React from 'react'
import { useSelector } from 'react-redux'
import { AccType } from '../../../utils/constants'
import { Navigate } from 'react-router-dom'

const StudentRoute = () => {
    const{profile:User}=useSelector(state=>state.profile)
    if(User.AccountType!==AccType.Student)
        return
    
}

export default StudentRoute