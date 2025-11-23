import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { paymnetapi } from "../api";

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const verifyPayment=async(data,courses,token,navigate,dispatch)=>{
    try{
        const payload={
                razorpay_order_id:data?.razorpay_order_id,
                 razorpay_payment_id:data?.razorpay_payment_id, 
                 razorpay_signature:data?.razorpay_signature,
                  courses
                
            }
        const response=await apiConnector("POST",paymnetapi.verifyPayment,payload,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment successFul");
        navigate("/dashboard/enrolled-courses")
    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message || "Error")
    }
}

export const buyCourse=async(courses,token,navigate ,dispatch)=>{
    const toastId=toast.loading("Loading..");
    try{
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        const response=await apiConnector("POST",paymnetapi.capturePayment,{courses},{
            Authorization:`Bearer ${token}`
        })
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        const options={
            key:import.meta.env.VITE_BASE_URL_Razorpay_keyID,
            currency:response.data.data.currency,
            amount:response.data.data.amount,
            order_id:response.data.data.id,
            handler:function(response){
                verifyPayment(response,courses,token,navigate,dispatch)
            },
            description:"Thank you for purchasing Course",

        }
        console.log(options)
        const razorpay =new window.Razorpay(options);
        razorpay.open()
    }
    catch(err){
        console.log(err)
       toast.error(err?.response?.data?.message || "Error")
    }
    toast.dismiss(toastId)
}