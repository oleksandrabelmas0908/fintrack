import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);

import { AuthProvider } from "./AuthContex";
import React from "react";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);