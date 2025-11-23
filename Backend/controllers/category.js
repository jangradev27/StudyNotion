const { populate } = require("dotenv");
const Category=require("../models/Category");
const { default: mongoose } = require("mongoose");



const getRandomInt=(max)=>{
    return Math.random()*max;
}
exports.CreateCategory=async(req,res)=>{
    try{
        const {Name, description}=req.body;
        if(!Name || !description){
            return res.json({
                success:false,
                message:"Please enter all required fields"
            })
        }
        const Categorydetails=await Category.create({Name,description})
        return res.status(200).json({
            success:true,
            message:"Tag created successfully",
            Categorydetails
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"ineranl server error",
            error:err.message
        })
    }
}


exports.getAllCategory=async(req,res)=>{
    try{
        const categories=await Category.find({},{Name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All tags passed successfully",
            Data:categories
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



exports.getCourseCategory=async(req,res)=>{
    
       try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "RatingReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory=null;
      if(categoriesExceptSelected.length!==0){
        differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        ).populate({
            path: "courses",
            match: { status: "Published" },
            })
            .exec()
        }
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "Instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } 
    catch (error) { 
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
