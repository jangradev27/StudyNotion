const express=require("express");
const router=express.Router()
// importing payment controllers
const {capturePayment,verifySignature}=require("../controllers/Payment.js")

// importing middlewares

const{isAuth,isAdmin,isInstructor,isStudent}=require("../middlewares/Auth.js")


// ------------------- PAYMENT ROUTES -------------------

// capture payment
router.post("/capture-payment", isAuth, isStudent, capturePayment);

// verify payment
router.post("/veriy-payment", isAuth, isStudent, verifySignature);
 
// send payment succesfull mail


// export router
module.exports=router