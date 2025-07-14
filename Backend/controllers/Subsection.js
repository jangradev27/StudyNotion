const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const {Uploader}=require("../utils/ImageUpload");
require("dotenv").config();

exports.CreateSubSection=async(req,res)=>{
    try{
        const {SectionID,title,description}=req.body;
        const Video=req.files.Video;
        if(!title || !SectionID ||  !description ||!Video){
            return res.status(400).json({
                success:false,
                message:"please enter the all fields"
            })
        }
        const Videodata=await Uploader(Video,process.env.Folder);
        console.log(Videodata);
        const newSubSection=await SubSection.create({title,TimeDuration:Videodata.duration,description,VideoUrl:Videodata.secure_url});
        const NewSection = await Section.findByIdAndUpdate(
            SectionID,
            { $push: { Subsection: newSubSection._id } },
            { new: true }
        ).populate({path:"Subsection"});
         // Make sure to populate SubSection field
        return res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:NewSection
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

exports.UpdateSubSection=async(req,res)=>{
    try{
        const {SectionId,SubSectionId,title,description}=req.body;
        const subsection=await SubSection.findById(SubSectionId);
        
        if( !SectionId || !subsection  ){
            return res.status(404).json({
                success:false,
                message:"Id not found",
            })
        }
        if(title){
            subsection.title=title;
        }
        if(description){
            subsection.description=description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImage(video, process.env.VideoFolderName);
            subsection.VideoUrl = uploadDetails.secure_url;
            subsection.TimeDuration = `${uploadDetails.duration}`;
        }
        await subsection.save();
        const updated=await Section.findById(SectionId).populate("Subsection").exec();
        return res.status(200).json({
            success:true,
            message:"Updated successfully",
            data:updated
        })

    }
    catch(err){
        return res.status(500).json({
            
        success:false,
        message:"internal server error at UpdateSection",
        error:err.message
        })
    }

}


exports.deleteSubsection=async(req,res)=>{
    try{
        const {SectionId,SubSectionId}=req.body;
        const isexist=await SubSection.findOne({_id:SubSectionId});
        if(!isexist){
            return res.status(404).json({
                success:false,
                message:'subsection not exist'
            })
        }

        const subsection=await SubSection.findByIdAndDelete(SubSectionId);

        const section=await Section.findOneAndUpdate({
            _id:SectionId
        },{$pull:{Subsection:SubSectionId}},{new:true}).populate("Subsection").exec()

        return res.status(200).json({
            success:true,
            message:"subsection Deleted SuccessFully",
            data:section
        })
         
         

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}