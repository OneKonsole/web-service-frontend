import React from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import routes from '~react-pages';
import App from "@/App.tsx";

const isValidToken = (token) => {
    return typeof token === 'string' && token.length > 0;
};

const ProtectedRoutes = () => {
    const { token, refreshToken } = useAuth();
    const navigate = useNavigate();
    const elements = useRoutes(routes);

    React.useEffect(() => {
        const unprotectedRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
        const currentPath = window.location.pathname;

        const isAuthenticated = isValidToken(token) && isValidToken(refreshToken);

        if (isAuthenticated && unprotectedRoutes.includes(currentPath)) {
            // Redirect authenticated users away from login/register/forgot-password to a default authenticated route
            navigate('/account');
        } else if (!isAuthenticated && !unprotectedRoutes.includes(currentPath)) {
            // Redirect non-authenticated users trying to access protected routes to the login page
            navigate('/auth/login');
        }
    }, [token, refreshToken, navigate]);

    return <App elements={elements} />;
};

export default ProtectedRoutes;
