import { getElements } from "../dom.js";
import { handleTextareaInput } from "./inputWatcher.js";
import { handleReset } from "./reset.js";
import { handleTextareaKeydown } from "./keyboardTeaxtarea.js";
import { handleClear } from "./clearTextarea.js";
import { handleGenerate } from "./generateBtn.js";

export class EventsHome {
  // TODO: los ifs para comprobar que un elemento no es null debe ser algo temporal
  setupEventHandlers() {
    const elements = getElements();

    // Generate Blueprint Handler
    // En este caso sí que se pasa el bloque de elements, TODO: por ahora
    if (elements.generateBtn) {
      elements.generateBtn.addEventListener(
        "click",
        // TODO: estos elements no están controlados y darán error
        handleGenerate({ elements })
      );
    }

    if (elements.clearBtn && elements.appDescription) {
      // Clear Handler, elimina el input escrito por el usuario
      elements.clearBtn.addEventListener(
        "click",
        handleClear({ appDescription: elements.appDescription })
      );
    }

    // Reset Handler, volver al estado inicial de la aplicación
    if (elements.resetBtn) {
      elements.resetBtn.addEventListener("click", handleReset());
    }

    if (elements.appDescription && elements.generateBtn) {
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
  }
}

/*
Esto otra opción para detectar la página en la que me encuentro
const isIndex = document.body.id === "index"; 
const isDiagram = document.body.id === "diagram"; 
 if (isIndex) {   // Lógica de index.html }  
 if (isDiagram) {   // Lógica de diagram.html }
*/

/*
sessionStorage para almacenar datos entre páginas

// En index.html 
sessionStorage.setItem("username", "Ana"); 
window.location.href = "diagram.html";

// En diagram.html
const username = sessionStorage.getItem("username"); 
console.log(username); // "Ana"
*/

// otra opción es local storage que es persistente incluso si se cierra la página o se recarga (luego hay que eliminar
// los datos manualmente)

// otra opción para la persistencia entre páginas es enviando datos al servidos y volver a leerlos

// esto ejecutandose como index.html (home)
// export function handleGenerate({ elements }) {
//   return async function () {
//     const description = elements.appDescription.value.trim();
//     if (!description) return; // Guardar en sessionStorage
//     sessionStorage.setItem("appDescription", description); // Ir al diagrama
//     window.location.href = "diagram.html";
//   };
// }

// esto ejecutandose como diagram.html (blueprint)
// document.addEventListener("DOMContentLoaded", () => {
//   const description = sessionStorage.getItem("appDescription");
//   if (description) {
//     document.getElementById("outputDescription").textContent = description;
//   }
// });
