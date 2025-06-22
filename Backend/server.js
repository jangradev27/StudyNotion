const cookieParser = require("cookie-parser");
const express=require("express");
require("dotenv").config();
const userRoutes=require("./routes/User");
const paymentRoutes=require("./routes/Payment");
const courseRoutes=require("./routes/Course");
const profileRoutes=require("./routes/Profile")
const contactUsRoute=require("./routes/Contact")
const dbconnect = require("./config/database");
const cloudinaryconnect = require("./config/cloudinary");
const cors=require("cors")
const fileupload=require("express-fileupload");

const app=express();
const Port=process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use(fileupload({
    useTempFiles : true,
   tempFileDir : '/tmp/'
}));

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}))

// mounting routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);

 



dbconnect();
cloudinaryconnect();
app.listen(Port,()=>{
    console.log("started at port"+Port);
})
app.get("/",(req,res)=>{
    res.send("welcome");
}) 
