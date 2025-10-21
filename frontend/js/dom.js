export const elements = {
  appDescription: document.getElementById("appDescription"),
  generateBtn: document.getElementById("generateBtn"),
  clearBtn: document.getElementById("clearBtn"),
  diagramContainer: document.getElementById("diagramContainer"),
  descriptionContainer: document.getElementById("descriptionContainer"),
  loading: document.getElementById("loading"),
};

export function resetOutput() {
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
