
import { setUser } from "../../slices/authSlice";
import { setProfileData, setUsersProfile } from "../../slices/profile";
import { Auth, CourseApi, SettingApi } from "../api";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

const {getUserEnrolledCourses_api}=CourseApi;
const{Update_ProfilePic_api,UpdateUserName_api,UpdateProfile_api}=SettingApi;
const {ChangePassword_api}=Auth

export const UpdateProfilePic=(token,formdata)=>{
    const toastId=toast.loading("Updating...");
    return async(dispatch)=>{
       try{
        const response=await apiConnector("PUT",Update_ProfilePic_api,formdata,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log(response.data.data.Image)
        const currentUser=JSON.parse(localStorage.getItem("user"));
        dispatch(setUser({...currentUser,Image:response.data.data.Image}));
        dispatch(setUsersProfile({...currentUser,Image:response.data.data.Image}))
        localStorage.setItem("user",JSON.stringify({...currentUser,Image:response.data.data.Image}));

       }
       catch(err){
        toast.error(err.response.data.message);

       }
       toast.success("Profile Pic Updated SuccessFully");
       toast.dismiss(toastId);

      
    }
}

export const UpdateUserName=(token,data)=>{
    const toastId=toast.loading("Updating...");
    console.log(token,data)
    return async(dispatch)=>{
       try{
     
        const response=await apiConnector("PUT",UpdateUserName_api,data,{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.success){
            
            throw new Error(response.data.message);
        }
        dispatch(setUsersProfile(response.data.data));
        localStorage.setItem("user",JSON.stringify(response.data.data));
        dispatch(setProfileData(response.data.data.AdditionalDetails));

       }
       catch(err){
        console.log(err)
        toast.error(err.response.data.message);
       }
       toast.dismiss(toastId);
       toast.success("UserName Updated SuccessFully");

    }
}


export const UpdateProfile=(token,data)=>{
    const toastId=toast.loading("Updating...");
    return async(dispatch)=>{
        try{
            const response=await apiConnector("PUT",UpdateProfile_api,data,{
                Authorization:`Bearer ${token}`
            })
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setUsersProfile(response.data.data));
            dispatch(setProfileData(response.data.data.AdditionalDetails));
            localStorage.setItem("user",JSON.stringify(response.data.data));

        }
        catch(err){
            toast.error(err.response.data.message)
        }
        toast.dismiss(toastId);
        toast.success("Profile Updated SuccessFulllt");
    }
}


export const changePassword=(token,data)=>{
    const toastId=toast.loading("Changing Password...");
    return async(dispatch)=>{
       try{
        console.log(data.password,data.NewPassword,token)
        const response= await apiConnector("PUT",ChangePassword_api,data,{
            "Content_Type":"application/json",
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        dispatch(setUsersProfile(response.data.data));
        dispatch(setProfileData(response.data.data.AdditionalDetails));
        localStorage.setItem("user",JSON.stringify(response.data.data))
       }
       catch(err){
        console.log(err);
        toast.error(err.response.data.message);

       }
       toast.dismiss(toastId);
      

    }
}

export async function getUserEnrolledCourses(token){
    let result=[]
    const toastId=toast.loading("fetching data...");
        try{
            const response=await apiConnector("GET",getUserEnrolledCourses_api,null,{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            })
           
            if(!response.data.success){
                throw new Error(response.data.message || response.error);
            }
            result=response.data.enrolledCourses.Courses;
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
            
        }
        toast.dismiss(toastId);
        return result;
    
}