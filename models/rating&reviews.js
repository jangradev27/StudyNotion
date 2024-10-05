const mongoose=require("mongoose");

const RatingSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    Rating:{
        type:Number,
        required:true,
        min:1,
        max:5

    },
    Review:{
        type:String,
        required:true
    }

})
module.exports=mongoose.model("RatingReviews",RatingSchema);