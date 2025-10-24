// Asegurar que se ejecute después del DOMContentLoaded
export function getElements() {
  // TODO: hacer refactor, no puede ser que siempre me esté devolviendo este carro de elementos
  return {
    appDescription: document.getElementById("appDescription"),
    generateBtn: document.getElementById("generateBtn"),
    clearBtn: document.getElementById("clearBtn"),
    resetBtn: document.getElementById("resetBtn"),
    diagramContainer: document.getElementById("diagramContainer"),
    descriptionContainer: document.getElementById("descriptionContainer"),
    loading: document.getElementById("loading"),
    outputDescription: document.getElementById("outputDescription"),
  };
}

export function resetOutput() {
  elements.appDescription.value = "";
  elements.diagramContainer.classList.add("empty");
  elements.diagramContainer.innerHTML =
    "<p>Your blueprint diagram will appear here</p>";
  elements.descriptionContainer.classList.add("empty");
  elements.descriptionContainer.innerHTML =
    "<p>Blueprint description will appear here</p>";
}

export function setLoading(state) {
  if (state) {
    elements.loading.classList.add("active");
    elements.generateBtn.disabled = true;
  } else {
    elements.loading.classList.remove("active");
    elements.generateBtn.disabled = false;
  }
}
