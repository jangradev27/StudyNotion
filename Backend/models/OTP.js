const mongoose = require("mongoose");
const SendMail = require("../utils/mail");
const { default: otpTemplate } = require("../templates/emailVerificationTemplate");

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: { 
        type: String,
        required: true,
    },
    TimeStamp: {
        type: Date,
        default: Date.now, // Fixed to use `Date.now` without parentheses
        expires: 5 * 60, // 5 minutes expiry
    },
});

async function mailerSender(email, otp) {
    try {
        let mail = await SendMail(email, "Verification mail from StudyNotion",otpTemplate(otp) );
        console.log("Email sent successfully", mail);
    } catch (err) {
        console.error(err.message);
        console.log("Error at mailerSender function"); 
    }
}

OtpSchema.pre("save", async function (next) {
    console.log(this.email, this.otp)
    await mailerSender(this.email, this.otp); 
    next();
});

module.exports = mongoose.model("OTP", OtpSchema);
