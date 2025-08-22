import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
  }, []);

  // User Login
  const userLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post('/api/users/login', { email, password });
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      throw error;
    }
  };

  // User Register
  const userRegister = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      throw error;
    }
  };

  // Admin Login
  const adminLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post('/api/admins/login', { email, password });
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      throw error;
    }
  };

  // Admin Register
  const adminRegister = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post('/api/admins', {
        name,
        email,
        password,
      });
      
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        loading,
        error,
        userLogin,
        userRegister,
        adminLogin,
        adminRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};