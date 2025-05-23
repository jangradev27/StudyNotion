const User=require("../models/user")
const OTP=require("../models/OTP")
const OtpGenerator=require("otp-generator");
const bcrypt=require("bcrypt")
const Profile=require("../models/profile")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const SendMail=require("../utils/mail");

exports.SendOtp=async(req,res)=>{
    try{
      
        const{email}=req.body; 
        
        const checkUser=await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }
        var otp=OtpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log(otp,"otp generated succesfully");
        let Uniqueness=await OTP.findOne({Otp:otp});
        while(Uniqueness){
            otp=OtpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false, //yeh bohot hi gnda code h because of undefinite dbcalls
                specialChars:false
            }) 
            Uniqueness=await OTP.findOne({otp:otp});
        }
        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);
        
        return res.status(200).json({
            message:"otp send successfully",
            success:true
        })
    }
    catch(err){
        console.log("error at Send OTp",err.message);
      
        return res.status(500).json({
            success:false,
            message:"internal server error",
            
        })
    }
}
 
exports.SignUp=async(req,res)=>{
    try{
        const{firstname,lastname,email,password,confirmPassword,AccountType,otp}=req.body;
        if(!firstname || !lastname || !email|| !password|| !confirmPassword|| !otp){
            return res.status(403).json({
                success:false,
                message:"Please enter all field"
            })
        }
        if(password != confirmPassword){
            return res.status(403).json({
                success:false,
                message:"password and confirm password mismatched"

            })
        }
        const PrevUser=await User.findOne({email});
        if(PrevUser){
            return res.json({
                success:false,
                message:"User Already exist"
            })
        }
        // find most recent OTP
        const RecentOtp=await OTP.find({email}).sort({TimeStamp:-1}).limit(1);
        console.log(RecentOtp);
        if(RecentOtp.length===0){
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }
        else if(otp!==RecentOtp[0].otp){
            console.log(RecentOtp)
            return res.status(400).json({
               
                success:false,
                message:"invalid Otp"
            })
        }
        const hashedPass=await bcrypt.hash(password,10);
        const profiledeatils=await Profile.create({
            Gender:null,
            DOB:null,
            About:null,
           
        
            
        })
        const user =await User.create({firstname,lastname,email,password:hashedPass,AccountType, 
                Image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastname}`,
                AdditionalDetails:profiledeatils._id
        })
        
        return res.status(200).json({
            success:true,
            message:"user is created succesfully",
            user
        })
    }
    catch(err){
        console.log("error at Signup");
        return res.status(500).json({
            success:false,
            message:"internal server error", 
            error:err.message
        })
    }
}


exports.login=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email}).populate(["AdditionalDetails","CourseProgess","Courses"]);
     
      if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
      const payload={email:user.email,id:user._id,accountType:user.accountType}
      const token=jwt.sign(payload,process.env.JWT_Secret,{
        expiresIn:"3d"
      })
      user.token=token;
      user.password=undefined;
      const options={
        expires:new Date(Date.now()+ 3*24*60*60*1000)
      }
      
      res.cookie("Token",token,options).status(200).json({
        success:true,
        message:"loged in",
        token,user,
        
      })
      

    }
    catch(err){
        console.log("error occured");
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
} 

exports.ChangePassword=async(req,res)=>{
    try{
        const{password,NewPassword}=req.body;
        const userId=req.user.id;
        console.log(userId,password,NewPassword)
        if(!userId || !password || !NewPassword ){
            return res.status(403).json({
                success:false,
                message:"please enter the required fields"
            })
        }
        const user =await User.findById(userId);
       
        if(!bcrypt.compare(password,user.password)){
            return res.json({
                success:false,
                message:"Current password is incorrect"
            })
        }
       
       
        const hashedpass=await bcrypt.hash(NewPassword,10);
        const UpdatePass=await User.findOneAndUpdate({_id:userId},{password:hashedpass},{new:true});
        await SendMail(user.email,"Password Change","Your password has been changed at"+ Date.now())

        res.status(200).json({
            success:true,
            message:"password changed successfully",
            data:UpdatePass,
            
        })
        
    }
    catch(err){
        console.log("error occured at chagnepassword");
        res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}