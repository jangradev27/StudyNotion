const mongoose= require("mongoose");

const SectionSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Subsection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }]
})
module.exports=mongoose.model("Section",SectionSchema)