    import { useSelector,useDispatch } from "react-redux";
    import { useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { logout } from "../Redux/authSlice";

    const useAuthCheck=()=>{
        const tokenExpiry=useSelector((state)=>state.auth.tokenExpiry);
        const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
        const dispatch=useDispatch();
        const navigate=useNavigate();

        useEffect(()=>{
            if(tokenExpiry){
                const now=new Date().getTime();
                const expiryTime=new Date(tokenExpiry).getTime();

                if(now>=expiryTime){
                    dispatch(logout());
                    navigate('/login');
                }
            }
        },[tokenExpiry,dispatch,navigate]);
        return isAuthenticated;
    };
    export default useAuthCheck;