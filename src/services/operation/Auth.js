import toast from "react-hot-toast";
import { Auth } from "../api";
import { setLoading, setLogout, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setProfileData, setUsersProfile } from "../../slices/profile";

export const login=(data,navigate)=>{
    
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST",Auth.Login_Api,data);
            
            if(!response.data.success){
                throw new Error( response.data.error || response.data.message);
               
            }
            toast.success("Login Successful");
            dispatch(setToken(response.data.token));
            const Userimage=response.data?.user?.Image? response.data.user.Image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname}${response.data.user.lastname}`;
            dispatch(setUsersProfile({...response.data.user,Image:Userimage}))
            
            dispatch(setProfileData(response.data.user.AdditionalDetails));
            dispatch(setUsersProfile({...response.data.user,Image:Userimage}));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message  || error.message);
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false));
        
    }
    
    

}


export const SignUp=(data,navigate)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Creating Account");
        dispatch(setLoading(true));
        try{
           
            const response=await apiConnector("POST",Auth.SignUp_Api,data);
            
            if(!response.data.success){
                throw new Error(response.data.error || response.data.message);
            }
            toast.success("Account Created Successfully,Please Login");
            navigate("/login");
        }
        catch(error){
            toast.error(error.response.data.message  || error.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));

    }
}

export const SendOtp=(data,navigate)=>{
    return async(dispatch)=>{
        const toastid=toast.loading("Sending Otp...");
        dispatch(setLoading(true));
        try{
           
            const response=await apiConnector("POST",Auth.SendOtp_Api,data);
            console.log(response)
            if(!response.data.success){
                throw new Error(response.data.message )
           }
            toast.success("Otp Send SucessFully ,Please Check you email")
            navigate("/Verify-Otp")
        }
        catch(error){
            toast.error(error.response.data.message  || error.message);
        }
        toast.dismiss(toastid);
        dispatch(setLoading(false))
    }
    
}

export const Logout=(navigate)=>{
    
    return async(dispatch)=>{
        const toastid=toast.loading("Loggin Out...");
        dispatch(setLoading(true));
        try{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(setLogout(null))
            dispatch(setUsersProfile(null))
            toast.success("Log Out Successfully");
            navigate("/")
        }
        catch(error){
            console.log(error)
            toast.error(error.response.data.message  || error.message);
        }
        toast.dismiss(toastid);
        
        dispatch(setLoading(false));
    }
}

export const ResetPasswordToken=(data,setEmailSent)=>{
    
    return async(dispatch)=>{

        const toastId=toast.loading("loading...");
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",Auth.ResetPasswordToken,data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Link Send Successfully");
            setEmailSent(true);
        }
        catch(error){
            toast.error(error.response.data.message || error.message);
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
       
    }
}


export const ResetPassword=(data,setChanged)=>{
    const toastid=toast.loading("Making Changes");
    
   return async(dispatch)=>{
    dispatch(setLoading(true));
    try{

        const response=await apiConnector("POST",Auth.ResetPassword,data);
       
        if(!response.data.success        ){
            throw new Error(response.data.message);

        }
     
        toast.success("Password Changed SuccessFully");
        setChanged(true)
    }
    catch(error){
        console.log(error)
        toast.error(error.response.data.message);
    }
    
    toast.dismiss(toastid)
    dispatch(setLoading(false))
   }
   
}