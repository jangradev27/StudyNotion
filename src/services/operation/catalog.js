
import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import {categories} from "../api"

export const getCatalogPageData  = async(categoryId) => {
    let result=[];
    const toastId=toast.loading("Loading...");
    try{
        const data={categoryId}
        const response=await apiConnector("POST",categories.getCategoryPageData,data);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("data fetched SuccessFully");
        result=response.data;
    }
    catch(err){
        console.log(err)
        toast.error(err.response.data.message);
        result=err.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}
