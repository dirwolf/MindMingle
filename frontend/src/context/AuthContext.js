import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import axios from 'axios';


 

const AuthContext = createContext();


 

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error('useAuth must be used within an AuthProvider');

    }

    return context;

};


 

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem('token'));

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);


 

    // Fetch current user from API


 

    const fetchCurrentUser = useCallback(async () => {

        try {

            const response = await axios.get('http://localhost:5001/api/auth/me');

            console.log("here is the fetchedcurrentUser from backend L : ", response.data);

            setUser(response.data.user);

            setIsAuthenticated(true);

            return response.data.user;

        } catch (error) {

            // Token is invalid, clear it

            localStorage.removeItem('token');

            localStorage.removeItem('user');

            setToken(null);

            setUser(null);

            setIsAuthenticated(false);

            throw error;

        }

    }, []);



 

    // Case A: Fresh login

    // User logs in → login() sets the header immediately.

    // setToken(token) triggers the useEffect, which also sets the header again (but with the same token).

    // That looks redundant, but harmless.

    // Case B: Page refresh / App reload

    // When app reloads, login() isn’t called (user is already logged in).

    // useEffect checks if a token is in localStorage, and only then sets the header.

    // This ensures the user stays logged in even after refresh.

    // Set up axios defaults and verify token

    useEffect(() => {

        const initAuth = async () => {

            if (token) {

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                try {

                    // Verify token by calling getCurrentUser API

                    await fetchCurrentUser();

                } catch (error) {

                    console.log('Token verification failed:', error);

                }

            }

            setLoading(false);

        };

        initAuth();

    }, [token, fetchCurrentUser]);


 

    const login = async (email, password) => {

        try {

            const response = await axios.post('http://localhost:5001/api/auth/login', {

                email,

                password

            });

            const { token } = response.data;

            // Store token in localStorage

            localStorage.setItem('token', token);

            // Set axios default header

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Update token state (this will trigger useEffect to call fetchCurrentUser)

            setToken(token);

            return { success: true };

        } catch (error) {

            return {

                success: false,

                error: error.response?.data?.message || 'Login failed'

            };

        }

    };


 

    const register = async (username, email, password, tags = []) => {

        try {

            await axios.post('http://localhost:5001/api/auth/signup', {

                username,

                email,

                password,

                tags

            });

            // Don't automatically log in the user after registration

            // Just return success - user will need to login separately

            return { success: true };

        } catch (error) {

            return {

                success: false,

                error: error.response?.data?.message || 'Registration failed'

            };

        }

    };

    const logout = () => {

        console.log('Logout function called');

        // Clear localStorage

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        localStorage.removeItem('currentChatId');

        // Clear axios default header

        delete axios.defaults.headers.common['Authorization'];


 

        // Update state

        setToken(null);

        setUser(null);

        setIsAuthenticated(false);

        console.log('Logout completed, state cleared');

    };


 

    const value = {

        user,

        token,

        isAuthenticated,

        loading,

        login,

        register,

        logout

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

};


 