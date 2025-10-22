import { generateBlueprintFromAPI } from "../api.js";
import { renderBlueprint, renderStructure } from "../render.js";
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
      await renderBlueprint(
        result,
        elements.diagramContainer,
        elements.descriptionContainer
      );
      await renderStructure(result.structure);
    } catch (err) {
      console.error("Error generating blueprint:", err);
      elements.diagramContainer.innerHTML = `<p style="color: #ef4444;">Error generating blueprint.</p>`;
      elements.descriptionContainer.innerHTML = `<p style="color: #ef4444;">Failed to generate description.</p>`;
    } finally {
      setLoading(false);
    }
  };
}
