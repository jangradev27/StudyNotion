import { createSlice } from "@reduxjs/toolkit";



const initialstate={
    token:localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
    Loading:false,
    User:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    formData:null

}
const AuthSlice=createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{
        setToken(state,value){
            state.token=value.payload
        },
        setLoading(state,value){
            state.Loading=value.payload
        },
        setUser(state,value){
            state.User=value.payload
        },
        setFormData(state,value){
            state.formData=value.payload
        },
        setLogout(state,value){
            state.token=value.payload;
            state.User=value.payload
        }
    }

})

export const {setToken,setLoading,setUser,setFormData,setLogout}=AuthSlice.actions;
export default AuthSlice.reducer;