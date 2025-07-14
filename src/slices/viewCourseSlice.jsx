import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNoLecture:0,
}

const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,value)=>{
            state.courseSectionData=value.payload;
        },
        setCourseEntireData:(state,value)=>{
            state.courseEntireData=value.payload
        },
        setCompletedLectures:(state,value)=>{
            state.completedLectures=[...state.completedLectures,value.payload]
        },
        setTotalNoOfLecture:(state,value)=>{
            state.totalNoLecture=value.payload
        },
        setStep:(state,value)=>{
            state.step=value.payload
        }
    }
})

export const {setCompletedLectures,setCourseEntireData,setTotalNoOfLecture,setCourseSectionData}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;