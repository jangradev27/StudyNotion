const express=require("express")
const router=express.Router();
// importing proile controllers
const{UpdateProfile,updateUserName,updateDisplayPicture,getEnrolledCourses,getAllUserDetails,DeleteAccount,instructorDashboard}=require("../controllers/Profile.js");


// importing middlewares

const{isAuth,isAdmin,isInstructor,isStudent}=require("../middlewares/Auth.js")



// ------------------- PROFILE ROUTES -------------------

// update profile
router.post("/update-proile", isAuth, UpdateProfile);

// update name
router.post("/update-user", isAuth, updateUserName);

// update display picture
router.post("/update-dp", isAuth, updateDisplayPicture);

// get all user details
router.get("/get-user", isAuth, getAllUserDetails);

// get enrolled courses
router.get("/enrolled-courses", isAuth, getEnrolledCourses);

// instructor dashboard
router.get("/instructor-dashboard", isAuth, isInstructor, instructorDashboard);

// delete account
router.delete("/delete-account", isAuth, DeleteAccount);

// export router
module.exports=router;