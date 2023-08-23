import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import Admin from './Admin';
import AdminDashboard from './AdminDashboard';
import { ContextProvider } from "./SocketContext";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
]);


ReactDOM.render(
    <ContextProvider>
        {/* <App /> */}
         <RouterProvider router={router} />
    </ContextProvider>,
    document.getElementById("root")
);
