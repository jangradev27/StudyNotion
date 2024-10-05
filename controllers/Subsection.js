const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const Uploader=require("../utils/ImageUpload");
require("dotenv").config();

exports.CreateSubSection=async(req,res)=>{
    try{
        const {SectionID,title,TimeDuration,description}=req.body;
       
        const{Video}=req.files.Video;
        if(!title || !SectionID || !TimeDuration || !description ||!Video){
            return res.status(400).json({
                success:false,
                message:"please enter the all fields"
            })
        }
        const Videodata=await Uploader(Video,process.env.Folder);
        console.log(Videodata);
        const newSubSection=await SubSection.create({title,TimeDuration,description,VideoUrl:Videodata.secure_url});
        const NewSection= await Section.findByIdAndUpdate(SectionID,{$push:{SubSection:newSubSection._id}},{new:true});
        console.log(NewSection.populate().exec());
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            Data:NewSection
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
