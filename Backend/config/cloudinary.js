const cloudinary=require("cloudinary").v2;
require("dotenv").config();
const cloudinaryconnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CloudName,
            api_key:process.env.API_Key,
            api_secret:process.env.Api_Secret
        })
        console.log("setupset")
    }
    catch(err){
        console.error(err);
    }
}
module.exports=cloudinaryconnect;
