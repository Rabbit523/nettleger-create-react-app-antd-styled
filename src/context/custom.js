import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [collapsed, setCollasped] = useState(JSON.parse(window.localStorage.getItem('theme')) || false);

  const setCollapseData = () => {
    setCollasped(!collapsed);
  };

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <ThemeContext.Provider value={{ collapsed, setCollapseData }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
