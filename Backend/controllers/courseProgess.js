
const SubSection =require("../models/SubSection");
const Section=require("../models/Section");
const CourseProgess = require("../models/CourseProgess");
exports.UpdateCourseProgess=async(req,res)=>{
    try{
        const{CourseId,SubsectionId}=req.body;
        const UserId=req.user;

        const subsection=await SubSection.findOne({
            _id:SubsectionId
        })

        if(!subsection){
            return res.status(404).json({

                success:false,
                message:"subsection does not exist"
            })
        }
        let progress=await CourseProgess.findOne({
            CourseId,
            UserId
        })

        if(progress.CompletedVideos.includes(SubsectionId)){
            return res.json({
                success:false,
                message:'Already completed section'
            })
        }

        progress.CompletedVideos.push(SubsectionId);
        await CourseProgess.save();
        return res.status(200).json({
            success:true,
            message:"updated successfully",
            data:progress
        })
    }   
    catch(err){
        return res.status(500).json({
            sucess:false,
            message:"inernal server erorr",
            error:err.message
        })
    }
}