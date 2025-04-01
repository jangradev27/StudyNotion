const mongoose = require("mongoose");
require("dotenv");

const dbconnect=()=>{
    mongoose.connect(process.env.Database_url)
    .then(()=>{
        console.log("db connected");
    })
    .catch((err)=>{
        console.log("error occured");
        console.error(err.message);
        process.exit(1);
    })
}
module.exports=dbconnect;