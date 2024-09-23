import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext("");

interface AuthProviderProps {
  children: any;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <></>;
  //   const [token, setToken] = useState(null);
  //   const value = { token, setToken };
  //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}
