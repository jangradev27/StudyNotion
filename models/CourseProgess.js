const mongoose=require("mongoose");

const CourseProgess=mongoose.Schema({
    CourseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    CompletedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }],

})
module.exports=mongoose.models("CourseProgress",CourseProgess);