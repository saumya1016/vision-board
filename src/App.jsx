import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/firebase';
import AuthForm from './AuthForm'; 
import VisionBoard from './VisionBoard';
import './App.css';
import CanvasEditor from './CanvasEditor';

function App() {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.button === 0) { // Left-click
        setMenu({ visible: true, x: e.clientX, y: e.clientY });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const closeMenu = () => {
    setMenu({ ...menu, visible: false });
  };

  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {user ? (
        <div style={{ height: '100%', width: '100%' }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000
          }}>
            <button 
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
          <VisionBoard />
          
        </div>
      ) : (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <AuthForm />
        </div>
        
      )
      
      }
    </div>
  );
}

export default App;