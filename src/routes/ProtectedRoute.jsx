import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("accessToken"); // check token

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If token exists, allow access
    return children;
}
