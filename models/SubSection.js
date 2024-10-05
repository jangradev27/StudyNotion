const mongoose= require("mongoose");

const SubSectionSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
      
    },
    TimeDuration:{
        type:String,
        required:true,
      
    },
    description:{
        type:String,
        required:true,
      
    },
    VideoUrl:{
        type:String,
        required:true,
      
    }
})
module.exports=mongoose.model("SubSection",SubSectionSchema)