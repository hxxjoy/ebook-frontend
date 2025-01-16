import React from 'react';
import AppRoutes from './route';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;