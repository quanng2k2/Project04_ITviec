import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  handleLogout: () => void;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  handleLogout,
  children,
}) => {
  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
