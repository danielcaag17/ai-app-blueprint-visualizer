import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "App.tsx";

// CSS globales
import "@css/reset.css";
import "@css/globals.css";
import "@css/components.css";
import "@css/layouts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
