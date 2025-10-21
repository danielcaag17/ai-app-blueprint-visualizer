import { generateBlueprintFromAPI } from "./api.js";
import { renderBlueprint } from "./render.js";
import { elements, resetOutput, setLoading } from "./dom.js";

export function setupEventHandlers() {
  // Generate Blueprint Handler
  elements.generateBtn.addEventListener("click", async () => {
    // El método trim() elimina espacios en blanco al inicio y al final
    const description = elements.appDescription.value.trim();
    // TODO: No poner alert
    if (!description) {
      const errorMessage = document.getElementById("errorMessage");
      errorMessage.textContent = "Please enter an app description";
      errorMessage.style.display = "block";
      errorMessage.style.opacity = "1";

      setTimeout(() => {
        errorMessage.style.display = "none";
        errorMessage.style.opacity = "0";
      }, 2000); // Desaparece después de 3 segundos

      return;
    }

    resetOutput();
    setLoading(true);

    try {
      const result = await generateBlueprintFromAPI(description);
      await renderBlueprint(
        result,
        elements.diagramContainer,
        elements.descriptionContainer
      );
    } catch (err) {
      console.error("Error generating blueprint:", err);
      elements.diagramContainer.innerHTML = `<p style="color: #ef4444;">Error generating blueprint.</p>`;
      elements.descriptionContainer.innerHTML = `<p style="color: #ef4444;">Failed to generate description.</p>`;
    } finally {
      setLoading(false);
    }
  });

  // Clear Handler
  elements.clearBtn.addEventListener("click", resetOutput);

  // Allow Enter key to submit (with Shift+Enter for new line)
  elements.appDescription.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      elements.generateBtn.click();
    }
  });
}
