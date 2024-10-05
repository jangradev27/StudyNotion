const Section=require("../models/Section");
const Course=require("../models/Course");

exports.CreateSection=async(req,res)=>{
    try{
        // data fetch
        const{name,Courseid}=req.body;

        // validation
        if(!name || !id){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        // create section
        const newsection = await Section.create({name});
       
        // add to course
        const UpdatedCourse=await Course.findByIdAndUpdate(Courseid,{$push:{CourseContent:newsection._id}},{new:true})// populate the function to get all teh detail of sectionand subsection
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
            error:err
        })
    }
}

exports.DeleteSection=async(req,res)=>{
    try{
        const {SectionId}=req.body;
        if(!SectionId){
            return res.status(400).json({
                success:false,
                message:"Please enter the all fields"
            })
        }
        await Section.findByIdAndDelete(SectionId);
        //Do we need to delete the from course schema
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
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


exports.UpdateSection=async(req,res)=>{
    try{
        const {name,SectionId}=req.params;
        if(!name || !SectionId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        const section=await Section.findByIdAndUpdate(SectionId,{name},{new:true});
        return res.status(200).json({
            success:false,
            message:"Section Update successfully",
            error:err
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