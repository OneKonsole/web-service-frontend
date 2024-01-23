import React, { useEffect } from "react";
import { logout } from "@utils/auth.ts";
import { useAuth } from "@components/common/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import {stopAutoRefreshToken} from "@utils/runWorkers.ts";

const LogoutC: React.FC = () => {
    const { refreshToken, token, setToken, setRefreshToken } = useAuth();
    const navigate = useNavigate();

    stopAutoRefreshToken();

    useEffect(() => {
        // Function to clear tokens from localStorage
        const clearTokens = () => {
            localStorage.removeItem('authTokens'); // Adjust the key if different
        };

        // Perform logout if tokens are present
        if (refreshToken && token) {
            logout({ refreshToken, token })
                .then(() => {
                    setToken(null);
                    setRefreshToken(null);
                    clearTokens(); // Clear tokens from localStorage
                    navigate("/auth/login"); // Redirect after successful logout
                })
                .catch(() => {
                    setToken(null);
                    setRefreshToken(null);
                    clearTokens(); // Clear tokens from localStorage
                    navigate("/auth/login"); // Redirect even in case of an error
                });
        } else {
            // Handle case where tokens are already null or empty
            clearTokens(); // Ensure tokens are cleared from localStorage
            navigate("/auth/login"); // Redirect if already logged out
        }
    }, [refreshToken, token, setToken, setRefreshToken, navigate]);

    return (
        <React.Fragment>
            <div className="flex items-center justify-center">
                <div className="text-gray-dark text-xl">Logging out...</div>
            </div>
        </React.Fragment>
    );
};

export default LogoutC;
