import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.tsx";
import DataSender from "./Components/DataSender.tsx";
import DataTable from "./Components/DataTable.tsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/data",
        element: <DataSender />,
      },
      {
        path: "/datatable",
        element: <DataTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
