// src/components/SignUp.jsx
import React, { useState } from 'react';
import { signUp } from './src/firebaseAuth'; 
import { useNavigate } from 'react-router-dom';
import './Login.css'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
        marginTop: '10px',
  maxWidth: '300px',
  height: '40px', 
  boxSizing: 'border-box',
  display: 'block',
      }} type="submit">Create Account</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default SignUp;
