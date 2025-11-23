import { addCourseDetails } from "./operation/Course"

const BASE_URL = "http://localhost:9000/api/v1"
export const categories={
    CATEGORIES_API:BASE_URL+"/course/AllCategory",
    getCategoryPageData:BASE_URL+"/course/getCourseCategory"
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
export const profileapi={
    getUserDetails_api:BASE_URL+"/profile/get-user"
}
export const CourseApi={
     getUserEnrolledCourses_api:BASE_URL+"/profile/enrolled-courses",
     getInstructorCourses_api:BASE_URL+"/course/getInstructorCourses",
     addCourseDetails_api:BASE_URL+"/course/CreateCourse",
     editCouseDetails_api:BASE_URL+"/course/editCourse",
     getCourseDetails_api:BASE_URL+"/course/getCourseDetails",
     CreateCourseSection_api:BASE_URL+"/course/CreateSection",
     CreateCourseSubSection_api:BASE_URL+"/course/CreateSubSection",
    EditCourseSubsection_api:BASE_URL+"/course/UpdateSubSection",
    DeleteCourseSection_api:BASE_URL+"/course/DeleteSection",
    EditCourseSection_api:BASE_URL+"/course/UpdateSection",
    DeleteCourseSubsection_api:BASE_URL+"/course/DeleteSubSection",
    EditCourseDetails_api:BASE_URL+"/course/editCourse",
    DeleteCourse_api:BASE_URL+"/course/deleteCourse"
}

export const SettingApi={
    Update_ProfilePic_api:BASE_URL+"/profile/update-dp",
    UpdateUserName_api:BASE_URL+"/profile/update-user",
    UpdateProfile_api:BASE_URL+"/profile/update-profile",
   

}
export const paymnetapi={
    capturePayment:BASE_URL+"/payment/capture-payment",
    verifyPayment:BASE_URL+"/payment/veriy-payment"
}


export const Contact={
    ContactUs_Api:BASE_URL+"/reach/contact",
    
}