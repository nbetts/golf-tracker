import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from 'src/pages/index';
import Courses from 'src/pages/courses';
import Players from 'src/pages/players';
import Scorecards from 'src/pages/scorecards';
import Error404 from 'src/pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/players',
        element: <Players />,
      },
      {
        path: '/scorecards',
        element: <Scorecards />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
