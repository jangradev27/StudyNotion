const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/user");

// isauth
exports.isAuth=async(req,res)=>{
    try{
        const token =req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }
        // verify the token
        try{
            const decode= jwt.verify(token,process.env.JWT_Secret);
            console.log(decode);
            req.user=decode;
            
        }
        catch(err){
            res.status(401).json({
              success:false,
              message:"Token is invalid"  
            })
        }
        next();
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.accountType!="Student"){
            res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}


exports.isInstructor=async(req,res,next)=>{
    try{
        if(req.user.accountType!="Instructor"){
            res.status(401).json({
                success:false,
                message:"This is protected route for Instructor only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

exports.isAdmin=async(req,res)=>{
    try{
        if(req.user.accountType!="Admin"){
            res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}