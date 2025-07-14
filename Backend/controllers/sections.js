const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection = require("../models/SubSection");
const { data } = require("react-router-dom");
const { populate } = require("dotenv");

exports.CreateSection=async(req,res)=>{
    try{
        // data fetch
        const{name,Courseid}=req.body; 

        // validation
        if(!name || !Courseid){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        // create section
        const newsection = await Section.create({name});
       
        // add to course
        const UpdatedCourse=await Course.findByIdAndUpdate(Courseid,{$push:{CourseContent:newsection._id}},{new:true}).populate({path:"CourseContent"})// populate the function to get all teh detail of sectionand subsection
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            Data:UpdatedCourse
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:err.message
        })
    }
}

exports.DeleteSection = async (req, res) => {
    try {
        const { SectionId, CourseId } = req.body;

        if (!SectionId || !CourseId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const section = await Section.findById(SectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        await SubSection.deleteMany({ _id: { $in: section.Subsection } });
        await Section.findByIdAndDelete(SectionId);

        const UpdatedCourse = await Course.findOneAndUpdate(
            { _id: CourseId },
            { $pull: { CourseContent: SectionId } },
            { new: true }
        ).populate({path:"CourseContent",populate:{path:"Subsection"}});

        return res.status(200).json({
            data: UpdatedCourse,
            success: true,
            message: "Section deleted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};



exports.UpdateSection=async(req,res)=>{
    try{
        const {name,SectionId,Courseid}=req.body;
        console.log(name,SectionId,Courseid)
        if(!name || !SectionId || !Courseid){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }

        const section=await Section.findByIdAndUpdate(SectionId,{name},{new:true});
        const updatedCourse=await Course.findById(Courseid).populate({path:"CourseContent",populate:{path:"Subsection"}});

        return res.status(200).json({
            success:true,
            message:"Section Update successfully",
            data:updatedCourse
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