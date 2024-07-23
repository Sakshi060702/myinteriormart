import React from "react";
import { Navigate } from "react-router-dom";
import useAuthCheck from '../Hooks/useAuthCheck'; // Correct import

const withAuthh = (Component) => {
    return (props) => {
        const isAuthenticated = useAuthCheck();

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        return <Component {...props} />;
    };
};

export default withAuthh;
