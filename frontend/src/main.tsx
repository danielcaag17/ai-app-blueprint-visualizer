import { StrictMode } from "react"; // Útil para desarrollo
import { createRoot } from "react-dom/client";
import App from "App.tsx";

import { UserProvider } from "./context/UserContext";

// CSS globales
import "@css/reset.css";
import "@css/globals.css";
import "@css/components.css";
import "@css/layouts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
