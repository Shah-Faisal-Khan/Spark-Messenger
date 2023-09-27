import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './Context/authContext';
import { ChatContextProvider } from './Context/chatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <ChatContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatContextProvider>
  </AuthContextProvider>
);

reportWebVitals();
