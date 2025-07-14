import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profile"
import cartReducers from "../slices/cartSlice"
import viewCourseSlice from "../slices/viewCourseSlice"
import CourseSlice from "../slices/Courseslice"
const rootreducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    Cart:cartReducers,
    Course:CourseSlice,
    viewCourse:viewCourseSlice
})
export default rootreducer;