import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./utils/providers/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { AllRoutes } from "./utils/routes/AllRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={AllRoutes}/>
      </AuthProvider>
  </React.StrictMode>
);
