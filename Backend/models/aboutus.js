const mongoose=require("mongoose");
const { string } = require("three/tsl");

const ContactUsSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("contacttUs",ContactUsSchema);