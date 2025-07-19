// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = ({ user, token }) => {
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
