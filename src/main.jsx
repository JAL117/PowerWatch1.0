import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHome from "./Pages/Layouts/LayoutHome";
import LayoutPanel from "./Pages/Layouts/LayoutPanel";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import Instrucciones from "./Pages/Instrucciones";

const router = createBrowserRouter([
  {
    path: "/AreaCliente",
    element: <LayoutPanel />,
    children: [
      {
        index: true,
        element: <Panel />,
      },
      {
        path: "Graficas",
        element: <></>,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Home/>,
      },{
        path:"Instrucciones",
        element:<Instrucciones/>
      }
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
