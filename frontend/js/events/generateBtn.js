import { generateBlueprintFromAPI } from "../api.js";
import {
  renderBlueprint,
  renderTechnologies,
  renderStructure,
} from "../render.js";
import { resetOutput, setLoading } from "../dom.js";

// Gestionar la acción al hacer click en el botón de generate
export function handleGenerate({ elements }) {
  return async function () {
    const description = elements.appDescription.value.trim();

    // Si no hay descripción el botón está desactivado
    if (!description) return;

    // UI transition
    // TODO: revisar que es lo que hace
    document.getElementById("inputView").classList.add("hide");
    document.getElementById("resultView").classList.add("show");
    document.getElementById("inputView").style.display = "none";
    elements.outputDescription.value = description;

    // TODO: esto ya no es del todo necesario
    resetOutput();
    // TODO: hay que modificar el loading
    setLoading(true);

    try {
      const result = await generateBlueprintFromAPI(description);
      // Render el esquema junto con la descripción
      await renderBlueprint(
        result,
        elements.diagramContainer,
        elements.descriptionContainer
      );
      // Render de las tecnologías
      await renderTechnologies({ analysis: result.analysis });
      // Render de la estructura de ficheros
      await renderStructure({ structure: result.structure });
      // TODO: a veces puede haber error en alguún container y no en todos
      // ver si el error está en la llamda a la API, lo cual aquí estaria bien
      // o si es por formato, lo cual debería aparecer error solo en el container pertinente
    } catch (err) {
      console.error("Error generating blueprint:", err);
      elements.diagramContainer.innerHTML = `<p style="color: #ef4444;">Error generating blueprint.</p>`;
      elements.descriptionContainer.innerHTML = `<p style="color: #ef4444;">Failed to generate description.</p>`;
    } finally {
      setLoading(false);
    }
  };
}
