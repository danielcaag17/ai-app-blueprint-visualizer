import { elements } from "../dom.js";
import { handleTextareaInput } from "./inputWatcher.js";
import { handleReset } from "./reset.js";
import { handleTextareaKeydown } from "./keyboardTeaxtarea.js";
import { handleClear } from "./clearTextarea.js";
import { handleGenerate } from "./generateBtn.js";

export function setupEventHandlers() {
  // Generate Blueprint Handler
  // En este caso sí que se pasa el bloque de elements, TODO: por ahora
  elements.generateBtn.addEventListener("click", handleGenerate({ elements }));

  // Clear Handler, elimina el input escrito por el usuario
  elements.clearBtn.addEventListener(
    "click",
    handleClear({ appDescription: elements.appDescription })
  );

  // Reset Handler, volver al estado inicial de la aplicación
  elements.resetBtn.addEventListener("click", handleReset());

  // Permite que al presionar Enter se consigue el mismo efecto que pulsar el botónd e generate
  elements.appDescription.addEventListener(
    "keydown",
    handleTextareaKeydown({ generateBtn: elements.generateBtn })
  );

  // Detectar cuando hay input del usuario en el textarea y activar el botón de generate Blueprint
  elements.appDescription.addEventListener(
    "input",
    handleTextareaInput({
      appDescription: elements.appDescription,
      generateBtn: elements.generateBtn,
    })
  );
}
