const mongoose=require("mongoose");

const CategorySchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    courses:[{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})
module.exports=mongoose.model("Category",CategorySchema);