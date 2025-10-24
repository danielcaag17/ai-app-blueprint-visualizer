import { getElements } from "../dom.js";

export class EventsStandardBlueprint {
  setupEventHandlers() {
    const elements = getElements();
    if (elements.resetBtn) {
      // Reset Handler, volver al estado inicial de la aplicación
      elements.resetBtn.addEventListener("click", handleReset());
    }
  }
}
