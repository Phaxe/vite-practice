import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css"; // Ensure Tailwind is loaded
import InvestmentTable from "./Pages/InvestmentTable";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Layout"; // Import the new Layout
import "./i18n";
import {Provider} from "react-redux"
import { store } from "./Redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout here
    children: [
      { index: true, element: <App /> },
      { path: "investment", element: <InvestmentTable /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
