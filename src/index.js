import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import { App } from './components'
import { AuthProvider } from './providers';
import { PostsProvider } from './providers/PostProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <AuthProvider>
      <PostsProvider>
      <App />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);
