import { createEventsHandler } from "./events/events_factory.js";

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

// Con DOMContentLoaded se asegura que solo se ejecuta cuando todos los elementos del HTML ya exiten
document.addEventListener("DOMContentLoaded", () => {
  // Detectar la página actual
  const pageId = document.body.id;

  // Crear el conjunto de eventos adecuado
  const eventsHandler = createEventsHandler(pageId);
  if (eventsHandler) {
    // Inicializar sus event listeners
    eventsHandler.setupEventHandlers();
  } else {
    console.warn(`No hay controlador de eventos para la página: ${pageId}`);
  }
});
