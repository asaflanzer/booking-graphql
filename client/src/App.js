import React from 'react';
import './App.css';
// context
import { AuthProvider } from './context/auth-context';
// routes
import ApplicationRoutes from './config/ApplicationRoutes';

const App = () => {
  return (
    <AuthProvider>
      <ApplicationRoutes />
    </AuthProvider>
  );
};

export default App;
