const RatingReviews=require("../models/rating&reviews");
const Course=require("../models/Course");

// creating rating 
exports.createRating=async(req,res)=>{
    try{
        const {CourseId,Rating,Review}=req.body;
        const {userId}=req.user.id;
        if(!userId || !CourseId || !Rating || !Review){
            return res.json({
                success:false,
                message:"All field are not entered"
            })
        }

        const NewRatingReview=await RatingReviews.create({user:userId,Rating,Review});
        const IsEnrolledStudent=await Course.findOne({_id:CourseId,$eleMatch:{$q:userId}});
        if(!IsEnrolledStudent){
            return res.status(400).json({
                sucess:false,
                message:"Student is not enrolled"
            })
        }
        const CourseDetails=await Course.findOneAndUpdate({_id:CourseId},{$push:{RatingReviews:NewRatingReview._id}},{new:true})
        return res.status(200).json({
            success:false,
            message:"Rating and reviews posted successfully",
            data:CourseDetails,
            RatingsReviews:NewRatingReview
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server at rating and reviews",
            error:err
        })
    }
}


// get average rating 

exports.getAverageRating=async(req,res)=>{
    try{
        const {CourseId}=req.body;
        // const CourseDetails=await Course.findOne({_id:CourseId}).populate("RatingReviews");
        // if(!CourseDetails){
        //     return res.status(404).json({
        //         success:false,
        //         message:"course not found"
        //     })
        // }
        // let Ratingsum=0;
        // Course.RatingReviews.forEach(element => {
        //     sum+=element.Rating;
        // });
        // const AverageRating=Ratingsum/Course.RatingReviews.length;

// second way of doing
        const result=RatingReviews.aggregate([{
            $match:{
                course:new mongoose.Types.ObjectId(CourseId)
            },

        },
        {
            $group:{
                _id:null,
                AverageRating:{
                    $avg:"$Rating"
                }
            }
        }
    ])

        return res.status(200).json({
            success:true,
            averagerating:result[0].AverageRating
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error at Average rating "
        })
    }
}


// get all rating 
exports.getCourseRating=async(req,res)=>{
    try{
        const{CourseId}=req.body;
        if(!CourseId){
            return res.status(400).json({
                success:false,
                message:"course id not found"
            })
        }
        const CourseDetails=await Course.findOne({_id:CourseId}).populate("RatingReviews").exec();
        if(!CourseDetails){
            return res.status(500).json({
                success:false,
                message:"Course Not found on this id"

            })

        }
        CourseDetails.RatingReviews.sort({Rating:"desc"});
        return res.status(200).json({
            success:true,
            data:CourseDetails
        })
        

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error at get course rating"
        })
    }
}



exports.getAllRating=async(req,res)=>{
    try{
        const allReviews=await RatingReviews.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstname lastname email"
        })
        .populate({
            path:"Course",
            select:"CourseName"
        }).exec()
        return res.status(200).json({
            success:true,
            data:allReviews
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"internal server error at get all course rating"
        })
    }
}