import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './context/authContext';
import DarkModeProvider from './context/darkModeContext';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
