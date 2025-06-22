const BASE_URL = "http://localhost:9000/api/v1"
export const categories={
    CATEGORIES_API:BASE_URL+"/course/AllCategory",
}

export const Auth={
    Login_Api:BASE_URL+"/auth/Login",
    SignUp_Api:BASE_URL+"/auth/signup",
    SendOtp_Api:BASE_URL+"/auth/sendotp",
    ResetPasswordToken:BASE_URL+"/auth/reset-password-token",
    ResetPassword:BASE_URL+"/auth/reset-password", 
     ChangePassword_api:BASE_URL+"/auth/change-password",
     VerifyToken_api:BASE_URL+"/auth/verify-token"
}

export const CourseApi={
     getUserEnrolledCourses_api:BASE_URL+"/profile/enrolled-courses",
     getInstructorCourses_api:BASE_URL+"/course/getInstructorCourses"
}

export const SettingApi={
    Update_ProfilePic_api:BASE_URL+"/profile/update-dp",
    UpdateUserName_api:BASE_URL+"/profile/update-user",
    UpdateProfile_api:BASE_URL+"/profile/update-profile",
   

}

export const Contact={
    ContactUs_Api:BASE_URL+"/reach/contact",
    
}