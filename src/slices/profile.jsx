import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    profile:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    profileData:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).AdditionalDetails : null,
    Loading: false,


}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialstate,
    reducers:{
        setUsersProfile(state,value){
            state.profile=value.payload
          
        },
        setLoading(state,value){
            state.Loading=value.payload
        },
        setProfileData(state,value){
            state.profileData=value.payload
        }
        
    }

})

export const {setUsersProfile,setLoading,setProfileData}=profileSlice.actions;
export default profileSlice.reducer;