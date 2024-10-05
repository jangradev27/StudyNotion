const User=require("../models/user");
const Course=require("../models/Course");
const {SendMail}=require("../utils/mail");
const {instance}=require("../config/razorpay");



//capture the payment and initiate the razorpay 
exports.capturePayment=async(req,res)=>{
    try{
        const{CourseId}=req.body;
        const UserId=req.user.id;
        if(!UserId || !CourseId){
            return res.status(404).json({
                success:false,
                message:"please enter the all fields"
            })
        }
        let course;
       try{
        course=await Course.findOne({CourseId});
        if(!course){
            return res.status(404).json({
                message:"could not found the course"
            })
        }
        const Uid=new mongoose.Types.ObjectId(UserId);
        if(course.EnrolledStudents.includes(Uid)){
            return res.json({
                success:false,
                message:"User already enrolld in this course"
            })
        }
       }
       catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"Error at finding the course"
        })
       }

       const amount=course.price;
       const currency="INR";
       const options={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course._id,
            UserId:Uid

        }
       }
      

       try{
        //initiate the payment using razorpay
        const PaymentResponse=await instance.orders.create(options);
        console.log(PaymentResponse);
        return res.status(200).json({
            success:true,
            CourseName:course.CourseName,
            description:course.CourseDescription,
            orderId:PaymentResponse.id,
            amount:PaymentResponse.amount,
            currency:PaymentResponse.currency
        })
       }
       catch(err){
        console.log(err);
        return res.json({
            success:false,
            message:"cannot intiate the payment"
        })
       }
       
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err,
            message:"internal server error at payment"
        })
    }
}

exports.verifySignature=async(req,res)=>{
    try{
        const webhookSecret="12345678";


        const signature=req.header("x-razorpay-signature");
       const shasum = crypto.createHmac("sha256",webhookSecret);
       shasum.update(JSON.stringify(req.body));
       const digest= shasum.digest('hex');

       if(signature==digest){
        console.log("payment is authorized");
        const{courseId,UserId}=req.body.payload.payment.entity.notes
        
        try{
            const course=await Course.findOneAndUpdate({_id:courseId},{$push:{EnrolledStudent:UserId}},{new:true});
            const user=await User.findOneAndUpdate({_id:UserId},{$push:{Courses:courseId}},{new:true});

            if(!course || !user){
                return res.json({
                    success:false,
                    message:"error occur at course & user"
                })
            }
            console.log(course).populate();
            console.log(user).populate();

            //send the mail to the user
            const mail=await SendMail(user._id,"course purchased","template of the body of email");
            console.log(mail);
            return res.status(200).json({
                success:true,
                message:"payment succesful"
            })
        }
        catch(err){
            return res.json({
                succes:false,
                message:err.message,
                error:err
            })
        }


       }
       return res.json({
        message:"signature not verifie"
       })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}