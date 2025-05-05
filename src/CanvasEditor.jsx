import React, { useRef, useState, useEffect } from 'react';

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [fileName, setFileName] = useState('my-design');
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState(100); // Quality percentage (1-100)

  // Initialize and redraw canvas when elements change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all elements
    elements.forEach(element => {
      if (element.type === 'rectangle') {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
      }
      // Add other element types here (circles, text, etc.)
    });
  }, [elements]);

  // Add a rectangle when canvas is clicked
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements([...elements, {
      type: 'rectangle',
      x,
      y,
      width: 100,
      height: 80,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    }]);
  };

  // Handle export/download
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    // Set format and quality
    const mimeType = exportFormat === 'png' ? 'image/png' : 'image/jpeg';
    const quality = exportFormat === 'png' ? 1.0 : exportQuality / 100;

    // Create download link
    const link = document.createElement('a');
    link.download = `${fileName}.${exportFormat === 'png' ? 'png' : 'jpg'}`;
    
    // Convert canvas to image
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Failed to create image');
        return;
      }
      
      link.href = URL.createObjectURL(blob);
      link.click();
      // Clean up
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }, mimeType, quality);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
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
        
        {exportFormat === 'jpeg' && (
          <div style={{ display: 'inline-block', marginRight: '10px' }}>
            <label>Quality: </label>
            <input
              type="range"
              min="1"
              max="100"
              value={exportQuality}
              onChange={(e) => setExportQuality(parseInt(e.target.value))}
              style={{ verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '5px' }}>{exportQuality}%</span>
          </div>
        )}
        
        <button 
          onClick={handleExport}
          style={{ 
            padding: '5px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Export Design
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        style={{ 
          border: '1px solid #000', 
          cursor: 'crosshair',
          backgroundColor: '#f5f5f5'
        }}
      />
    </div>
  );
};

export default CanvasEditor;