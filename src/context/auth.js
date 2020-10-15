import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: JSON.parse(window.localStorage.getItem('token')) });

  const setAuthData = (data) => {
    setAuth(data);
  };

  useEffect(() => {
    window.localStorage.setItem('token', JSON.stringify(auth.token));
  }, [auth]);
  
  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
