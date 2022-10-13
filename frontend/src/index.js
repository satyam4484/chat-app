import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { AppProvider } from "./context";
import "./css/main.css";

const root = createRoot(document.getElementById("root"));
root.render(

    <AppProvider>
      <App />
    </AppProvider>
);
