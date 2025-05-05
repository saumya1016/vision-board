import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import { router } from './router'; // Import from new file

import ReactDOM from 'react-dom/client'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);