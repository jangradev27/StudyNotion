const User= require("../models/user")
const SendMail=require("../utils/mail")
const bcrypt=require("bcrypt")
// Resetpassword token
exports.ResetPasswordToken=async(req,res)=>{
    try{
        const email=req.body.email;
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"you email is not registered with us"
            })
        }
        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email},
            {
                token:token,
                ResetPassTime:Date.now()+5*60*1000

        },{new:true})

        
        // create url using token for frontend
        const url=`https://localhost:3000/update-password${token}`
        // sendmail
        await SendMail(email,"Pass Link",`Change Pass Link ${url}`)

        return res.json({
            success:true,
            message:"Mail send successfully Please check the mail"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err
        })
    }
}



// Reset password
exports.ResetPassword=async(req,res)=>{
    try{
        const {Pass,ConfirmPass,token}=req.body;
        if(Pass!==ConfirmPass){
            return res.json({
                success:false,
                message:"password not matching"
            })
        }
        const user=await User.findOne({token});
        if(!user){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        if(user.ResetPassTime < Date.now()){
            return res.json({
                success:false,
                message:"Token expires"
            })
        }
        const hashedPass=bcrypt.hash(ConfirmPass,10);
        await User.findOneAndUpdate({token},{password:hashedPass},{new:true})
        return res.status(200).json({
            success:true,
            message:"password changed successfully"
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