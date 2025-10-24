export class EventsPremiumBlueprint {
  setupEventHandlers() {
    if (elements.resetBtn) {
      // Reset Handler, volver al estado inicial de la aplicación
      elements.resetBtn.addEventListener("click", handleReset());
    }
  }
}
