import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 简单模拟持久化登录态
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("serase_auth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("serase_auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("serase_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}