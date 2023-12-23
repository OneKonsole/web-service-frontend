import React, {useContext, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';

export const AuthProvider: React.FC = ({children}) => {
    const {token, refreshToken} = useContext(AuthContext);
    // Load tokens synchronously during initial state setup
    const loadInitialTokens = () => {
        try {
            const storedTokens = localStorage.getItem('authTokens');
            return storedTokens ? JSON.parse(storedTokens) : {token: null, refreshToken: null};
        } catch (error) {
            console.error('Error loading tokens from localStorage:', error);
            return {token: null, refreshToken: null};
        }
    };

    const [authTokens, setAuthTokens] = React.useState(loadInitialTokens());

    const saveTokens = (tokens: { token: null; refreshToken: null; }) => {
        try {
            if (tokens.token !== null && tokens.refreshToken !== null) {
                localStorage.setItem('authTokens', JSON.stringify(tokens));
            }
        } catch (error) {
            console.error('Error saving tokens to localStorage:', error);
        }
    };

    // Save tokens to local storage whenever they change
    useEffect(() => {
        saveTokens(authTokens);
    }, [authTokens]);

    const setToken = (token: string) => {
        setAuthTokens(prev => ({...prev, token}));
    };

    const setRefreshToken = (refreshToken: string) => {
        setAuthTokens(prev => ({...prev, refreshToken}));
    };

    return (
        <AuthContext.Provider
            value={{token: authTokens.token, setToken, refreshToken: authTokens.refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    );
};
