import React, { createContext, useState } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });

    const tok = res.data.token;
    const userData = {
      username: res.data.username,
      role: res.data.role,
    };

    // Save in localStorage
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(userData));

    // Update states
    setToken(tok);
    setUser(userData);

    return tok;
  };

  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
