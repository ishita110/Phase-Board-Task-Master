import React, { createContext, useState, useContext } from 'react';

// Possible roles
export const ROLES = {
  ADMIN: 'admin',
  PM: 'project_manager',
  MEMBER: 'team_member',
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, role }

  const login = (name, role) => {
    setUser({ name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
