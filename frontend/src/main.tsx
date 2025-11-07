import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@css/reset.css";
import "@css/globals.css";
import "@css/components.css";
import "@css/layouts.css";
import App from "@components/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
