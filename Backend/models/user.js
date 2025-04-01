const mongoose= require("mongoose");

const UserSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        
    },
    AccountType:{
        type:["Student","Instructor","Admin"],
        required:true,
        
    },
    AdditionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    Courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    Image:{
        type:String,
        required:true,
        
    },
    CourseProgess:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    ResetPassTime:{
        type:Date
    },
    token:{
        type:String,

    }
})
module.exports= mongoose.model("User",UserSchema); 