import React from 'react';
import Routes from './routes';
import AuthProvider from "./context/auth";
import ThemeProvider from "./context/custom";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>      
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
