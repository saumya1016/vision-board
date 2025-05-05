import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NewBoardPage() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState('');

  const handleCreate = () => {
    if (!boardName.trim()) {
      alert('Please enter a board name');
      return;
    }
    const newId = Date.now().toString();
    const boards = JSON.parse(localStorage.getItem('visionBoards') || '{}');
    boards[newId] = { name: boardName, items: [] };
    localStorage.setItem('visionBoards', JSON.stringify(boards));
    navigate(`/board/${newId}`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Create New Board</h2>
      <input
        type="text"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="Board Name"
        style={{ padding: '5px', margin: '10px' }}
      />
      <button onClick={handleCreate} style={{ padding: '5px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
        Start Blank Board
      </button>
    </div>
  );
}