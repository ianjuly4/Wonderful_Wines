import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyContextProvider } from './components/MyContext'; 
import routes from "./routes"; // Import routes
import "./index.css";

// Create router with the defined routes
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContextProvider> 
    <RouterProvider router={router} />
  </MyContextProvider>
);
