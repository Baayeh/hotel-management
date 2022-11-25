import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Login, AppWrapper, Dashboard, FrontDesk, Booking } from "./pages";
import { FrontDeskOverview, Availables, ClientDetails, Reservation, Confirmation, Payment } from "./components";

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
        path: "",
        element: <AppWrapper></AppWrapper>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard></Dashboard>,
          },
          {
            path: "front-desk",
            element: <FrontDesk></FrontDesk>,
            children: [
              {
                index: true,
                element: <FrontDeskOverview></FrontDeskOverview>,
              },
              {
                path: "availables",
                element: <Availables></Availables>,
              },
            ],
          },
          {
            path: "booking",
            element: <Booking />,
            children: [
              {
                index: true,
                element: <ClientDetails />
              },
              {
                path: "reservation",
                element: <Reservation />
              },
              {
                path: "payment",
                element: <Payment />
              },
              {
                path: "confirmation",
                element: <Confirmation />
              },
            ],
          }
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
