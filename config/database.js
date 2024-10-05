const mongoose = require("mongoose");
require("dotenv");

const dbconnet=()=>{
    mongoose.connect(process.env.Database_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("db connected");
    })
    .catch((err)=>{
        console.log("error occured");
        console.error(err);
        process.exit(1);
    })
}
module.exports=dbconnet;