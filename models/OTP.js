const mongoose=require("mongoose");
const SendMail=require("../utils/mail");

const OtpSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Otp:{
        type:String,
        required:true
    },
    TimeStamp:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

async function mailerSender(email,otp){
    try{
        let mail=await SendMail(email,"verification mail from StudyNotion",otp);
        console.log("email sent successfully",mail);
    }
    catch(err){
        console.error(err);
        console.log("error at mailersender fucntion")
    }
}
Otp.pre("save",async function (next){
    await mailerSender(this.email,this.otp);
    next();
})

module.exports=mongoose.models("OTP",OtpSchema);