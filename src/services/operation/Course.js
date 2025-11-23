import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { CourseApi } from "../api";
import {setCourse,setEditCourse} from "../../slices/Courseslice"

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

export const addCourseDetails=async(data,token)=>{
    const toastid=toast.loading("Adding Course Details");
    let result=null;
    try{
        const response=await apiConnector("POST",CourseApi.addCourseDetails_api,data,{
            Authorization:`Bearer ${token}`,
            "Content-Type":"multipart/form-data"
        })
        console.log(response);
        if(!response.data.success){
            throw Error(response?.data?.message);
        }

        toast.success("Course Created SuccessFully");
        result=response?.data?.data;

    }
    catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message);
    }
    toast.dismiss(toastid);
    return result;
}

export const getCourseDetails=(data,navigate)=>{
    const toastid=toast.loading("fetching details");
    return async(dispatch)=>{
       try{
         const response=await apiConnector("POST",CourseApi.getCourseDetails_api,data);
         console.log(response)
        if(!response?.data?.success){
            throw Error(response?.data?.message);
        }
        dispatch(setCourse(response?.data?.data?.courseDetails));
        dispatch(setEditCourse(true));
        toast.success("Data fetched SuccessFully");
        navigate("/dashboard/add-course");
       }
       catch(err){
        console.log(err);
        toast.error(err?.response?.data?.message);
       }

       toast.dismiss(toastid);
    }
}


export const CreateCourseSection=(data,token)=>{
    const toastId=toast.loading("Creating Section");

    return async(dispatch)=>{
        try{
            const response=await apiConnector("POST",CourseApi.CreateCourseSection_api,data,{
                Authorization:`Bearer ${token}`
            });
            console.log(response);
            if(!response.data.success){
                throw Error(response.data.message);
            }
            toast.success("Section Created SuccessFully");
            dispatch(setCourse(response.data.Data));
            

        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message);
        }

        toast.dismiss(toastId);
    }

}


export const DeleteCourseSection=(data,token,setConfirmationModal)=>{
    const toastid=toast.loading("Deleting Section");
    return async(dispatch)=>{
        try{
            const response=await apiConnector("DELETE",CourseApi.DeleteCourseSection_api,data,{
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.success){
            throw Error(response.data.message);
        }
        toast.success("Section Deleted SuccessFully");
        dispatch(setCourse(response.data.data));
        setConfirmationModal(null);
     }
     catch(err){
        console.log(err);
        toast.error(err.response.data.message);
     }
     toast.dismiss(toastid);
    }
    

}

export const UpdateCourseSection=(data,token)=>{
    const toastId=toast.loading("Updating Section");

    return async(dispatch)=>{
       try{
         const response=await apiConnector("PUT",CourseApi.EditCourseSection_api,data,{
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.success){
            throw Error(response.data.message);
        }
        toast.success("Section Updated SuccessFully");

        dispatch(setCourse(response.data.data));
       }
       catch(err){
        console.log(err);
        toast.error(err.response.data.message);
       }
       toast.dismiss(toastId);
    }

}


export const CreateSubSection=async(data,token)=>{
    let result=[];
    const toastId=toast.loading("Adding lecture to Course");
    try{
        const response=await apiConnector("POST",CourseApi.CreateCourseSubSection_api,data,{
            Authorization:`Bearer ${token}`
        })
        console.log(response.data.data);
        if(!response.data.success){
            throw Error(response.data.message);
            
        }

        result=response.data.data;
        toast.success("Lecture Added successFully");
    }
    catch(Err){
        toast.error(Err.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}



export const EditCourseSubsectionData=async(data,token)=>{
    let result=[];
    const toastid=toast.loading("Changing Subsection Data");
    try{
      const response=  await apiConnector("PUT",CourseApi.EditCourseSubsection_api,data,{
      Authorization:`Bearer ${token}`});
        console.log(response);
        if(!response.data.success){
            throw Error(response.data.message);
        }

        result=response.data.data;
        toast.success("Changes Made SuccessFully");

    }
    catch(err){
        toast.error(err.response.data.message);
    }
    toast.dismiss(toastid);
    return result;
}



export const deleteSubsection=async(data,token)=>{
    let result=[];
    const toastId=toast.loading("Making Changes");
    try{
        const response=await apiConnector("DELETE",CourseApi.DeleteCourseSubsection_api,data,{
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.message){
            throw Error(response.data.message);
        }
        result=response.data.data;
        toast.success("Subsection Deleted SuccessFully");
    }
    catch(Err){
        toast.error(Err.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const editCourseDetails=async(data,token)=>{
    let result=[];
    const toastId=toast.loading("Updating Course Status");
    try{
        const response=await apiConnector("PUT",CourseApi.EditCourseDetails_api,data,{
            Authorization:`Bearer ${token}`
        })
        console.log(response);
        if(!response.data.success){
            throw Error(response.data.message);
        }
        toast.success("Course Status Updated SuccessFully");
        result=response.data.data
    }
    catch(err){
        toast.error(err.response.data.message);
    }
    toast.dismiss(toastId)
    return result;

}

export const DeleteCourse=async(data,token,setCourses)=>{
    console.log(data)
    const toastId=toast.loading("Deleting Course");
    
        try{
            const response=await apiConnector("DELETE",CourseApi.DeleteCourse_api,data,{
                Authorization:`Bearer ${token}`
            })
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            setCourses(response.data.data);
            toast.success("Course Deleted");

        }
        catch(Err){
            console.log(Err)
            toast.error(Err.response.data.message);
        }
        toast.dismiss(toastId);
   
}