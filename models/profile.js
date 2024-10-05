const mongoose=require("mongoose");

const ProfileSchema=mongoose.Schema({
    gender:{
        type:String,
        required:true,
        
    },
    DOB:{
        type:String,
        required:true,
    
    },
    About:{
        type:String,
        required:true,
        trim:true
    },
    ContactNumber:{
        type:Number,
        required:true,
        trim:true
    }
})
module.exports = mongoose.model("Profile",ProfileSchema);