import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";



const authSlice=createSlice({
    name:'auth',
    initialState: {
        token: (localStorage.getItem("state_token") != null) ? localStorage.getItem("state_token") : null,
        // user:(localStorage.getItem("state_user") != null) ? localStorage.getItem("state_user") : null,
        isAuthenticated: (localStorage.getItem("state_isAuthenticated") != null) ? JSON.parse(localStorage.getItem("state_isAuthenticated")) : false,
        tokenExpiry: (localStorage.getItem("state_tokenExpiry") != null) ? localStorage.getItem("state_tokenExpiry") : null,
        userType: (localStorage.getItem("state_userType") != null) ? localStorage.getItem("state_userType") : null,
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.token=action.payload.token;
            state.user=action.payload.user;
            
            state.isAuthenticated=true;
            state.tokenExpiry=action.payload.tokenExpiry;


            console.log(state.user);
            
            localStorage.setItem("state_token", state.token);
            // localStorage.setItem("state_user", state.user);
            localStorage.setItem("state_isAuthenticated", state.isAuthenticated);
            localStorage.setItem("state_tokenExpiry", state.tokenExpiry);
            
        },

        setUserType: (state, action) => {
            localStorage.setItem("state_userType", action.payload);
            state.userType = action.payload;
        },

        logout:(state)=>{
            state.token=null;
            state.user=null;
            state.isAuthenticated=false;
            state.tokenExpiry = null;
            state.userType = null;

            
            localStorage.setItem("state_token", null);
            // localStorage.setItem("state_user", null);
            localStorage.setItem("state_isAuthenticated", null);
            localStorage.setItem("state_tokenExpiry", null);

            localStorage.setItem("token_startTime", null);
            localStorage.setItem("token_endTime", null);

        },
    },
});
export const { loginSuccess,setUserType, logout } = authSlice.actions;
export default authSlice.reducer;

