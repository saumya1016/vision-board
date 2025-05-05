// src/AuthForm.js
import React, { useState } from 'react';
import Login from './Login';  
import SignUp from './SignUp'; 
import './AuthForm.css'

function AuthForm() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      width: '400px',
      maxWidth: '90vw'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333'}}>
        {showLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      
      <div style={{ 
        display: 'flex',
        marginBottom: '20px',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <button 
          style={{
            flex: 1,
            padding: '10px 4px',
            background: showLogin ? 
         'linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4)': '#e0e0e0',
            color: showLogin ? 'white' : '#333',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} 
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button 
          style={{
            flex: 1,
            padding: '4px',
            background: !showLogin ? 
            'linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4)': '#e0e0e0',
            color: !showLogin ? 'white' : '#333',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} 
          onClick={() => setShowLogin(false)}
        >
          Sign Up
        </button>
      </div>
      
      {showLogin ? <Login /> : <SignUp />}
    </div>
  );
}

export default AuthForm;