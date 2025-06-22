import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
    cart:localStorage.getItem("Cart")?JSON.parse(localStorage.getItem("Cart")):[],
    
    totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0,
    total:localStorage.getItem("Total")?JSON.parse(localStorage.getItem("Total")):0
    


}
const cartSlice=createSlice({
   name:"Cart",
    initialState,
    reducers:{
      
        AddToCart(state,value){
            const Course=value.payload;
            const index=state.cart.findIndex((item)=>item.id===Course);
            if(index>=0){
                toast.error("Course is already in Cart");
                return;
            }
            state.cart.push(Course);
            state.totalItems++;
            state.total+=Course.price;
            localStorage.setItem("Cart",JSON.stringify(state.cart))
            localStorage.setItem("Total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
        },
        removeFromCart(state,value){
            const course=value.payload;
            console.log(course)
            const index=state.cart.findIndex((item)=>item._id===course);
            console.log(index);
            if(index>=0){
                state.totalItems--;
                state.total-=state.cart[index].price;
                state.cart.splice(index,1);
                localStorage.setItem("Cart",JSON.stringify(state.cart));
                localStorage.setItem("Total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            }
            toast.success("Item Removed successFully")
        },
        resetCart(state,value){
            state.cart=[];
            state.total=0;
            state.totalItems=0;
            localStorage.removeItem("Cart");
            localStorage.removeItem("Total");
            localStorage.removeItem("totalItems");
        }
    }
})

export const {AddToCart,removeFromCart,resetCart}=cartSlice.actions;
export default cartSlice.reducer;