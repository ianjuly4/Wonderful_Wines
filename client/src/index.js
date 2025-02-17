import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyContextProvider } from './components/MyContext'; 
import routes from "./routes"; 
import "./index.css";


const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyContextProvider> 
    <RouterProvider router={router} />
  </MyContextProvider>
);
