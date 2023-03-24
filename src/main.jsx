import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import { Login, AppWrapper, Dashboard, FrontDesk, Booking } from './pages';
import { FrontDeskOverview, Availables } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Login></Login>,
      },
      {
        path: '',
        element: <AppWrapper></AppWrapper>,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard></Dashboard>,
          },
          {
            path: 'front-desk',
            element: <FrontDesk></FrontDesk>,
            children: [
              {
                index: true,
                element: <FrontDeskOverview></FrontDeskOverview>,
              },
              {
                path: 'availables',
                element: <Availables></Availables>,
              },
            ],
          },
          {
            path: 'booking',
            element: <Booking />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
