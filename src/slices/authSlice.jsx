import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    signupData:null,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload; 
        },
        setSignupData(state,value){
            state.signupData = value.payload;
        }
    },
});

export const {setLoading,setSignupData,setToken} = authSlice.actions;
export default authSlice.reducer; 