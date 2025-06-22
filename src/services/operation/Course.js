import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { CourseApi } from "../api";

export const getInstructorCourses=async(token)=>{
   const toastid= toast.loading("Getting Course");
   let result=[]
    try{
        const response=await apiConnector("GET",CourseApi.getInstructorCourses_api,null,{
            Authorization:`Bearer ${token}`
        })
        
        if(!response.data.success){
            throw new Error(response.data.message)
        }

         result=response.data.data
        toast.success("Course Fetched SuccessFully");
       
        
    
    }
    catch(err){
        console.log(err);
        toast.error(err.response.data.message);
    }

     toast.dismiss(toastid);
     return result;
}