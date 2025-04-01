import { createSlice } from "@reduxjs/toolkit";

const initialstate={
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    Loading: false,

}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialstate,
    reducers:{
        setUsersProfile(state,value){
            state.user=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        }
    }

})

export const {setUsersProfile,setLoading}=profileSlice.actions;
export default profileSlice.reducer;