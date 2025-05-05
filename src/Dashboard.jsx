import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [boards, setBoards] = useState(() => {
    return JSON.parse(localStorage.getItem('visionBoards') || '{}');
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setBoards(JSON.parse(localStorage.getItem('visionBoards') || '{}'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="dashboard">
      <aside>
        <h2>Your Boards</h2>
        <Link to="/new-board" style={{ display: 'block', margin: '10px 0', color: '#4CAF50' }}>+ New Board</Link>
        <ul>
          {Object.entries(boards).map(([id, board]) => (
            <li key={id}>
              <Link to={`/board/${id}`} style={{ color: 'white', display: 'block', padding: '5px' }}>
                {board.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}