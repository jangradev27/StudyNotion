const express=require("express")
const router = express.Router();


// importing middlewares

const{isAuth,isAdmin,isInstructor,isStudent}=require("../middlewares/Auth.js")
// importing auth controllers
const{SendOtp,login,ChangePassword, SignUp}=require("../controllers/auth.js")

// importing reset password controllers
const {ResetPassword,ResetPasswordToken}=require("../controllers/ResetPassword.js")

// importing middlewares
// --------------- AUTH ROUTES -------------------
  
// sendotp
router.get("/verify-token",isAuth);
router.post("/sendotp", SendOtp);

// signup
router.post("/signup", SignUp);

// login
router.post("/Login", login);

// change password
router.put("/change-password",isAuth, ChangePassword);


// ------------------- RESET PASSWORD -------------------

// send reset password link with token
router.post("/reset-password-token", ResetPasswordToken);

// reset password
router.post("/reset-password", ResetPassword);

// export router
module.exports=router; 