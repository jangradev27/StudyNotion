const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/user")
const Uploader=require("../utils/ImageUpload");
const { populate } = require("dotenv");
// create course
exports.CreateCourse=async(req,res)=>{
    try{
        const{CourseName,CourseDescription,WhatLearn,price,tag: category}=req.body;
        const{thumbnail}=req.files.thumbnail
        if(!CourseName || !CourseDescription || !WhatLearn || !price || !category ||!thumbnail){
            return res.json({
                success:false,
                message:"Please enter all fields"
            })
        }
        const UserId=req.user._id;
        // finding instructor
        const user=await User.findById(UserId);
        console.log("userDetails: ",user);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Instrutor not found"
            })
        }
        const validCategory=await Category.findById(category);
        if(!validCategory){
            return res.status(404).json({
                success:false,
                message:"tag not found"
            })
        }
        
        const ThumbanilImage=await Uploader(thumbnail,process.env.FolderName);

        // create an entry for new Course
        const NewCourse=await Course.create({
            CourseName,
            CourseDescription,
            instructor:user._id,
            WhatLearn,
            price,tag:category._id,
            thumbnail:thumbnail.secure_url
        })

        // adding courser to user schmea 
        await User.findByIdAndUpdate({_id:user._id},{$push:{Courses:NewCourse._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"course created Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err
        })

    }
}




// getall course\
exports.getAllcourse=async(req,res)=>{
    try{
        const Courses=await Course.find({}).populate().exec()
        return res.status(200).json({
            success:true,
            message:"Course are fetched successfully",
            Data:Courses,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body;
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Course ID not found"
            })
        }
        const courseDetails=await Course.findOne({_id:courseId}).populate(
            {
                path:"Instructor",
                populate:{
                    path:"AdditonalDetails",
                }
            }
        ).populate("category")
        .populate("RatingReviews")
        .populate({
            path:"CourseContent",
            populate:{
                path:"Subsection"
            }
        }).exec();
        if(!courseDetails){
            return res.json({
                success:false,
                message:"could not find the course with this id"
            })
        }
        return res.status(200).json({
            success:true,
            message:"course detailed fetched",
            Data:courseDetails
        })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err
        })
    }
}