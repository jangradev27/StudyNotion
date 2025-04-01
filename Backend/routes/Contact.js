const express=require("express")

const {contactUscontroller } = require("../controllers/contactus")
const router=express.Router()

// ------------------- CONTACT US ROUTES -------------------
router.post("/contact",contactUscontroller);

module.exports=router;