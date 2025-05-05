import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import './visionBoard.css';
import { useParams, Link } from 'react-router-dom';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
          <h2>Something went wrong with the Vision Board</h2>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const DraggableResizableItem = ({ item, updateItem, removeItem }) => {
  const [position, setPosition] = useState({ x: item.x, y: item.y });
  const [size, setSize] = useState({ width: item.width, height: item.height });
  const [isActive, setIsActive] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: item.width, height: item.height });
  const itemRef = useRef(null);

  useEffect(() => {
    setPosition({ x: item.x, y: item.y });
    setSize({ width: item.width, height: item.height });
    setCrop({ x: 0, y: 0, width: item.width, height: item.height });
  }, [item.x, item.y, item.width, item.height]);

  const handleMouseDown = (e) => {
    if (isResizing) return;
    setIsActive(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsActive(false);
      updateItem(item.id, { x: position.x, y: position.y });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = () => {
    if (item.type === 'text') {
      const newText = prompt('Edit text:', item.content);
      if (newText !== null) {
        updateItem(item.id, { content: newText });
      }
    }
  };

  const startResize = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setIsActive(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startLeft = position.x;
    const startTop = position.y;
    const aspectRatio = startWidth / startHeight;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;
      let newCrop = { ...crop };

      if (['ne', 'se', 'sw', 'nw'].includes(direction)) {
        if (direction === 'ne' || direction === 'se') {
          newWidth = Math.max(50, startWidth + deltaX);
          newHeight = newWidth / aspectRatio;
        } else if (direction === 'nw' || direction === 'sw') {
          newWidth = Math.max(50, startWidth - deltaX);
          newHeight = newWidth / aspectRatio;
          newLeft = startLeft + (startWidth - newWidth);
        }
        if (direction === 'se' || direction === 'sw') {
          newHeight = Math.max(50, startHeight + deltaY);
          newWidth = newHeight * aspectRatio;
        } else if (direction === 'ne' || direction === 'nw') {
          newHeight = Math.max(50, startHeight - deltaY);
          newWidth = newHeight * aspectRatio;
          newTop = startTop + (startHeight - newHeight);
        }
        newCrop = { x: 0, y: 0, width: newWidth, height: newHeight };
      } else {
        if (direction === 'e') {
          newWidth = Math.max(50, startWidth + deltaX);
          newCrop.width = newWidth;
        }
        if (direction === 'w') {
          newWidth = Math.max(50, startWidth - deltaX);
          newLeft = startLeft + (startWidth - newWidth);
          newCrop.width = newWidth;
        }
        if (direction === 's') {
          newHeight = Math.max(50, startHeight + deltaY);
          newCrop.height = newHeight;
        }
        if (direction === 'n') {
          newHeight = Math.max(50, startHeight - deltaY);
          newTop = startTop + (startHeight - newHeight);
          newCrop.height = newHeight;
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newLeft, y: newTop });
      setCrop(newCrop);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsResizing(false);
      setIsActive(false);
      updateItem(item.id, {
        width: size.width,
        height: size.height,
        x: position.x,
        y: position.y,
        crop,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const ResizeHandle = ({ direction }) => (
    <div
      className={`resize-handle resize-${direction}`}
      onMouseDown={(e) => startResize(e, direction)}
    />
  );

  return (
    <div
      ref={itemRef}
      className={`draggable-item ${isActive ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        overflow: item.type === 'image' ? 'hidden' : 'visible',
      }}
    >
      {item.type === 'text' ? (
        <p>{item.content}</p>
      ) : (
        <img
          src={item.content}
          alt="Vision board item"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: `${crop.x}px ${crop.y}px`,
          }}
        />
      )}
      {['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'].map((dir) => (
        <ResizeHandle key={dir} direction={dir} />
      ))}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          removeItem(item.id);
        }}
      >
        ×
      </button>
    </div>
  );
};

function VisionBoard() {
  const { boardId } = useParams();
  const [items, setItems] = useState([]);
  const [fileName, setFileName] = useState('vision-board');
  const [exportFormat, setExportFormat] = useState('png');
  const boardRef = useRef(null);
  const [exportError, setExportError] = useState(null);

  
  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('visionBoards') || '{}');
    const boardItems = boards[boardId]?.items || [];
    setItems(boardItems);
  }, [boardId]);

  
  useEffect(() => {
    const boards = JSON.parse(localStorage.getItem('visionBoards') || '{}');
    boards[boardId] = { ...boards[boardId], items };
    localStorage.setItem('visionBoards', JSON.stringify(boards));
  }, [items, boardId]);

  const addItem = useCallback((newItem) => {
    setItems((prev) => [
      ...prev,
      {
        ...newItem,
        id: Date.now(),
        x: window.innerWidth / 2 - (newItem.width / 2),
        y: window.innerHeight / 2 - (newItem.height / 2),
        width: newItem.width || 200,
        height: newItem.height || 150,
      },
    ]);
  }, []);

  const updateItem = useCallback((id, updates) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleExport = async () => {
    try {
      setExportError(null);
      if (!boardRef.current) {
        throw new Error('Board reference not found');
      }
      const canvas = document.createElement('canvas');
      const boardElement = boardRef.current;
      canvas.width = boardElement.scrollWidth;
      canvas.height = boardElement.scrollHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      await Promise.all(items.map((item) => {
        return new Promise((resolve) => {
          if (item.type === 'text') {
            ctx.fillStyle = item.color || '#000000';
            ctx.font = '20px Arial';
            ctx.fillText(item.content, item.x, item.y + 20);
            resolve();
          } else if (item.type === 'image') {
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, item.x, item.y, item.width, item.height);
              resolve();
            };
            img.onerror = () => {
              console.error('Failed to load image:', item.content);
              resolve();
            };
            img.src = item.content;
          } else {
            resolve();
          }
        });
      }));

      const link = document.createElement('a');
      link.download = `${fileName}.${exportFormat}`;
      link.href = canvas.toDataURL(`image/${exportFormat}`, 1.0);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 100);
    } catch (error) {
      console.error('Export failed:', error);
      setExportError(`Export failed: ${error.message}`);
    }
  };

  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <Sidebar onAddImage={addItem} onAddText={addItem} />
          <div
            ref={boardRef}
            style={{
              flex: 1,
              position: 'relative',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              overflow: 'auto',
              padding: '20px'
            }}
          >
            <Link
              to="/"
              style={{
                position: 'fixed',
                top: '10px',
                left: '300px',
                padding: '5px 15px',
                background: '#4CAF50',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none'
              }}
            >
              Back to Dashboard
            </Link>
            {exportError && (
              <div style={{
                position: 'fixed',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#ffebee',
                color: '#c62828',
                padding: '10px 20px',
                borderRadius: '4px',
                zIndex: 1001,
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                {exportError}
                <button
                  className='delete-btn'
                  onClick={() => setExportError(null)}
                  style={{
                    marginLeft: '10px',
                    width: "10px",
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              zIndex: 1000,
              background: 'white',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File name"
                style={{ marginRight: '10px', padding: '5px' }}
              />
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
              <button
                onClick={handleExport}
                style={{
                  padding: '5px 15px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Export Design
              </button>
            </div>
            {items.map((item) => (
              <DraggableResizableItem
                key={item.id}
                item={item}
                updateItem={updateItem}
                removeItem={removeItem}
              />
            ))}
          </div>
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
}

export default VisionBoard;