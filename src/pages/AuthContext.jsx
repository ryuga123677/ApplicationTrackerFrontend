// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [islogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 

  const login = (data) => {
    setIsLogin(true);
    setUserInfo(data); 
  };

  const logout = () => {
    setIsLogin(false);
    setUserInfo(null); 
  };

  return (
    <AuthContext.Provider value={{ islogin, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
