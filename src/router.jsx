import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Dashboard from './Dashboard';
import VisionBoard from './VisionBoard';
import NewBoardPage from './NewBoardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        children: [
          { 
            path: 'board/:boardId',
            element: <VisionBoard />
          },
          {
            path: 'new-board',
            element: <NewBoardPage />
          }
        ]
      }
    ]
  }
]);