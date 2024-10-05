const Razorpay=require("razorpay");
require("dotenv").config();

exports.instance=new Razorpay({
    key_id:process.env.Razorpay_keyID,
    key_secret:process.env.Razorpay_secret
});
