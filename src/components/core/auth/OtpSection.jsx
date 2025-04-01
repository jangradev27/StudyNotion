import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../../../services/operation/Auth";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdRestore } from "react-icons/md";

const OtpSection = () => {
    const [otp, setOtp] = useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {formData}=useSelector(state=>state.auth);
    const handlesubmit=(e)=>{
        e.preventDefault();
        const data={
            ...formData,otp
        }
        console.log(data)
        dispatch(SignUp(data,navigate))
    }
    const ResendOtp=()=>{
        const data={
            ...formData,otp
        }
        console.log(data)
        dispatch(SignUp(data,navigate))
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-5  rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold">
                    Verify Email
                </h1>
                <p className=" text-rich-black-200">
                    A verification code has been sent to you. Enter the code below.
                </p>
                <form className="flex flex-col gap-4  border-white" onSubmit={handlesubmit}>
                <OTPInput
                    value={otp}
                     onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                    <input
                     {...props}
                   placeholder="-"
                     style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                     className="w-[48px] lg:w-[60px] border-0 bg-rich-black-800 rounded-[0.5rem] text-rich-black-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                    />
                   )}
                     containerStyle={{
                    justifyContent: "space-between",
                     gap: "0 6px",
                   }}
                    />
                    <button type="submit" className=" w-full bg-yellow-100 text-black hover:bg-yellow-200 h-[2rem] text-xl rounded-md transition-colors ">Submit</button>

                </form>
                <div className="flex justify-between items-center">
                    <Link  to={"/login"}>
                        <div className='flex gap-2 text-white  items-center'>
                                <FaLongArrowAltLeft/>
                                <p>Back to login</p>
                        </div>
                    </Link>
                    <button onClick={()=>ResendOtp()} className=" text-blue-300 hover:text-blue-400 transition-colors cursor-pointer">
                        <div className="flex justify-center items-center  gap-2" >
                        <MdRestore/>
                        Resend it
                       </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpSection;
