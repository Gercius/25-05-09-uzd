import { createContext, useContext, useEffect, useState } from "react";
import * as authServices from "../services/AuthServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("jwtToken") || null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!token);
        if (token) {
            localStorage.setItem("jwtToken", token);
        } else {
            localStorage.removeItem("jwtToken");
        }
    }, [token]);

    const getResponse = async (response) => {
        const data = await response;
        if (data?.token) setToken(data.token);
        return data;
    };

    // Login
    const login = async (email, password) => {
        return getResponse(authServices.login(email, password));
    };

    // Logout
    const logout = async () => {
        setToken(null);
        authServices.logout();
    };

    // Register
    const createUser = async (userData) => {
        return getResponse(authServices.createUser(userData));
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, setToken, login, logout, createUser, getResponse }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth turi buti naudojamas su Auth provider");

    return context;
};
