// Render blueprint function
export async function renderBlueprint(
  // TODO: hacer algo con analysis
  { mermaidCode, description, analysis },
  diagramContainer,
  descriptionContainer
) {
  // Render Mermaid diagram
  diagramContainer.classList.remove("empty");
  const id = "mermaid-" + Date.now();
  diagramContainer.innerHTML = `<div class="mermaid" id="${id}">${mermaidCode}</div>`;
  await mermaid.run({ querySelector: `#${id}` });

  // Render description
  descriptionContainer.classList.remove("empty");
  let html = `<h3>${description.title}</h3><p>${description.overview}</p>`;

  if (description.components?.length) {
    html +=
      '<h3 style="margin-top: 1rem;">Key Components:</h3><ul style="margin-left: 1.5rem; color: var(--text-secondary);">';
    description.components.forEach(
      (c) => (html += `<li style="margin-bottom: 0.5rem;">${c}</li>`)
    );
    html += "</ul>";
  }

  descriptionContainer.innerHTML = html;
}
