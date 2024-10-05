const mongoose=require("mongoose");

const CourseSchema=mongoose.Schema({
    CourseName:{
        type:String,
        trim:true,
        required:true
    },
    CourseDescription:{
        type:String,
        trim:true,
        required:true
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instructor"
    },
    WhatLearn:{
        type:String,
   
    },
    CourseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    RatingReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingReviews"
    }],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    tag:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    EnrolledStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    
    }],
    instructions:{
        type:String
    },
    status:{
        type:String,
        enum:["Draft","Published"]
    }

})
module.exports=mongoose.model("Course",CourseSchema);