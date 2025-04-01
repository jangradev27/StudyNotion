import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profile"
import cartReducers from "../slices/cartSlice"
const rootreducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    Cart:cartReducers
})
export default rootreducer;