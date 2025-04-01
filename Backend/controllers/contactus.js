const {contactUsEmail} =require("../templates/contactFormRes");
const sendmail =require("../utils/mail")
exports.contactUscontroller=async(req,res)=>{
    try{
        const{firstname,lastname,email,message}=req.body;
        const EmaiLres=await sendmail(email,"Your Data Send Successfully",contactUsEmail(email,firstname,lastname,message));
        return res.status(200).json({
            success:true,
            message:"response send successfully",
            EmaiLres
        })
    }
    catch(err){
        return res.status(500).json({
            message:'internal server error at Contact us',
            success:false,
            error:err.message
        })
    }
}