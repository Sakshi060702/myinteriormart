import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:null,
        user:null,
        isAuthenticated: false,
        tokenExpiry: null,
        userType:null,
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.token=action.payload.token;
            state.user=action.payload.user;
            
            state.isAuthenticated=true;
            state.tokenExpiry=action.payload.tokenExpiry;
        },

        setUserType: (state, action) => {
            state.userType = action.payload;
        },

        logout:(state)=>{
            state.token=null;
            state.user=null;
            state.isAuthenticated=false;
            state.tokenExpiry = null;
            state.userType = null;

        },
    },
});
export const { loginSuccess,setUserType, logout } = authSlice.actions;
export default authSlice.reducer;

