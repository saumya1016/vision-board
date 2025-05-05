// src/components/Login.jsx
import React, { useState } from 'react';
import { logIn } from './src/firebaseAuth'; 
import './Login.css';

function LogIn({mode}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <form onSubmit={handleLogIn}>

      <input className='input-gmail'
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input className='input-pass'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button style={{
        background: 
         'linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4)',
        color: '#ffffff',  
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '100%',  // Full width to span across the form
        marginTop: '10px' 
      }} type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LogIn;
