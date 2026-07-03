import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./location/LocationContext";


ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

  <React.StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <LocationProvider>

         <App />
      
        </LocationProvider>

      </AuthProvider>

    </ThemeProvider>


  </React.StrictMode>

);