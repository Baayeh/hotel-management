import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Login, AppWrapper, Dashboard } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Login></Login>,
      },
      {
        path: "dashboard",
        element: <AppWrapper></AppWrapper>,
        children: [
          {
            index: true,
            element: <Dashboard></Dashboard>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
