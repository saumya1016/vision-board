import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ onAddImage, onAddText }) {
  const fileInputRef = useRef(null);
  const [textInput, setTextInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  // Image upload handlers
  const handleImageUpload = (file) => {
    if (!file?.type.match('image.*')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      onAddImage({
        type: 'image',
        content: e.target.result,
        width: 300,
        height: 200
      });
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      style={{
        width: '280px',
        padding: '20px',
        background: isDragging ? '#e3f2fd' : '#2c3e50',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        transition: 'background 0.3s'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 style={{ margin: 0 }}>Vision Board</h2>
      
      {/* Image Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleImageUpload(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #3498db, #2980b9)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '10px'
          }}
        >
          Upload Image
        </button>
        <div style={{ 
          padding: '20px', 
          border: `2px dashed ${isDragging ? '#3498db' : '#7f8c8d'}`,
          borderRadius: '4px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <p>Or drag & drop image here</p>
        </div>
      </div>
      
      {/* Text Add */}
      <div>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter inspirational text..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: 'none'
          }}
        />
        <button
          onClick={() => {
            if (textInput.trim()) {
              onAddText({
                type: 'text',
                content: textInput,
                width: 200,
                height: 150,
                color: '#000000'
              });
              setTextInput('');
            }
          }}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #2ecc71, #27ae60)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Add Text
        </button>
      </div>
      
      {/* New Board Button */}
      <div>
        <button
          onClick={() => navigate('/new-board')}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #e67e22, #d35400)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          New Board
        </button>
      </div>
      
      {/* Instructions */}
      <div style={{ 
        marginTop: 'auto',
        padding: '10px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>Tip:</strong></p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li>Double-click text to edit</li>
          <li>Drag corners to resize</li>
          <li>Click × to delete</li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;