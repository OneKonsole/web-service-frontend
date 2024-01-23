import {createContext, useContext} from 'react';

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    refreshToken: string | null;
    setRefreshToken: (refreshToken: string | null) => void;
};
export const AuthContext = createContext<AuthContextType>({
    token: null,
    refreshToken: null,
    setToken: () => {
    },
    setRefreshToken: () => {
    },
});

export const useAuth = () => useContext(AuthContext);