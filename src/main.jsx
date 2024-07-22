import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LayoutHome from "./Pages/Layouts/LayoutHome";
import LayoutPanel from "./Pages/Layouts/LayoutPanel";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Panel from "./Pages/Panel";
import Instrucciones from "./Pages/Instrucciones";
import RecuperarContraseña from "./Pages/RecuperarContraseña";
import Graficas from "./Pages/Graficas";
import Comparativas from "./Pages/Comparativas";
import Planes from "./Pages/Planes";
import Reportes from "./Pages/Reportes";
import PrivateRoute from './PrivateRouter';

const router = createBrowserRouter([
  {
    path: "/AreaCliente",
    element: <PrivateRoute/>, 
    children: [
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
            element: <Graficas />,
          },
          {
            path: "Comparativa",
            element: <Comparativas />,
          },
          {
            path: "Reportes",
            element: <Reportes />,
          },
          {
            path: "Planes",
            element: <Planes />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Instrucciones",
        element: <Instrucciones />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/RecuperacionDeContraseña",
    element: <RecuperarContraseña />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
