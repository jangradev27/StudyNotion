const User = require("../models/user");
const Course = require("../models/Course");
const SendMail = require("../utils/mail");
const { instance } = require("../config/razorpay");
const courseEnrollmentEmail = require("../templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { useDropzone } = require("react-dropzone");

exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    console.log(courses)
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No courses provided",
      });
    }

    let totalAmount = 0;
    for (const courseId of courses) {console.log("hogya")
      const course = await Course.findById(courseId);
      const user=await User.findOne({_id:userId})
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log("hogya part 2")
      
      if (course.EnrolledStudents.includes(user._id)) {
        return res.status(400).json({
          success: false,
          message: "Student is already enrolled",
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (err) {
    console.error("Error in capturePayment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error at payment",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.Razorpay_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    for (const courseId of courses) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // update course
      await Course.findByIdAndUpdate(
        course._id,
        { $push: { EnrolledStudents: user._id } },
        { new: true }
      );

      // update user
      await User.findByIdAndUpdate(
        userId,
        { $push: { Courses: course._id } },
        { new: true }
      );

      // send mail
      const template= `Dear ${user.firstname} you have enrolled in Course ${course.CourseName}`
      await SendMail(
        user.email,
        "Course Enrollment",
        template
      );
    }

    return res.status(200).json({
      success: true,
      message: "Course(s) purchased successfully",
    });
  } catch (err) {
    console.error("Error in verifyPayment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

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