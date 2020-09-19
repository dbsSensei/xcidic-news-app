import React, { useState, createContext } from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};
