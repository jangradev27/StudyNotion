import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
   totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0,



}
const cartSlice=createSlice({
   name:"Cart",
    initialState,
    reducers:{
        SetTotalItems(state,value){
            state.totalItems=value.payload
        },
        AddToCart(state,value){
            state.totalItems+=1
        },
        removeFromCart(state,value){
            state.totalItems-=1
        },
        resetCart(state,value){
            state.totalItems=0
        }
    }
})

export const {}=cartSlice.actions;
export default cartSlice.reducer;