const BASE_URL = "http://localhost:9000/api/v1"
export const categories={
    CATEGORIES_API:BASE_URL+"/course/AllCategory",
}

export const Auth={
    Login_Api:BASE_URL+"/auth/Login",
    SignUp_Api:BASE_URL+"/auth/signup",
    SendOtp_Api:BASE_URL+"/auth/sendotp",
    ResetPasswordToken:BASE_URL+"/auth/reset-password-token",
    ResetPassword:BASE_URL+"/auth/reset-password"
}

export const Contact={
    ContactUs_Api:BASE_URL+"/reach/contact"
}