const Category=require("../models/Category");

exports.CreateCategory=async(req,res)=>{
    try{
        const {Name, description}=req.body;
        if(!Name || !description){
            return res.json({
                success:false,
                message:"Please enter all required fields"
            })
        }
        const Categorydetails=await Tag.create({TagName,description})
        return res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"ineranl server error",
            error:err
        })
    }
}


exports.getAllCategory=async(req,res)=>{
    try{
        const categories=await Category.find({},{TagName:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All tags passed successfully",
            Data:tags
        })

    }
    catch(err){
        console.log(err);
        return res.status.json({
            success:false,
            message:"internal server error",
            error:err
        })
    }
}


exports.getCourseCategory=async(req,res)=>{
    try{
        const CategoryId=req.body;
        const Courses=await Category.findById({_id:CategoryId}).populate("course").exec();
        if(!Courses){
            return res.status(404).json({
                success:false,
                message:"Courses not found with this category"
            })

        }
        const differentCategory=await Category.find({
            _id:{
                $ne:CategoryId
            }
        }).populate("course").exec();
        return res.status(200).json({
            success:true,
            Courses,
            differentCategory
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error at Course Category"
        })
    }
}