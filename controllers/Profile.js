const Profile=require("../models/profile");
const User=require("../models/user");
const Course=require("../models/Course");
const Course = require("../models/Course");

exports.UpdateProfile=async(req,res)=>{
    try{
        const{gender,DOB,About,ContactNumber}=req.body;
        const {userId}=req.user.id;
        if(!gender || !DOB || !About ||!ContactNumber ||!userId){
            return res.status(400).json({
                success:false,
                message:"Please enter the fields"
            })
        }
        const user=await User.findById(userId);
        const profileId=user.AdditonalDetails;
        const NewProfile=await Profile.findByIdAndUpdate(profileId,{gender,DOB,About,ContactNumber},{new:true});
        return res.status(200).json({
            success:true,
            message:"profile update successfully",
            Data:NewProfile
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err
        })
    }
}


exports.DeleteAccount=async(req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById({userId})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(user.AccountType==="Student"){
          const AllCourse=user.Courses;
          for(let j=0;j<AllCourse.length;j++){
            const Coursedetails=await Course.findById(AllCourse[j]);
            const Students=Coursedetails.EnrolledStudents.filter((id)=>id!=user.Id)
            const newStudents=await Course.findByIdAndUpdate({element},{
                EnrolledStudents:Students
            })
          }
          ;
        }
        const userDetails=await Profile.findByIdAndDelete({_id:user.AdditonalDetails});
        await User.findByIdAndDelete(userId)
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"true",
            error:err}
        )
    }
}
exports.getAllUserDetails=async(req,res)=>{
    try{
        const id=req.user.id;
        const details=await User.findById(id).populate("AdditionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"all details",
            data:details
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"true",
            error:err})

    }
}