export function createTree(obj) {
  const ul = document.createElement("ul");

  for (let key in obj) {
    const li = document.createElement("li");

    // Si es una carpeta
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      Object.keys(obj[key]).length > 0
    ) {
      li.classList.add("folder");

      // Crear el contenedor clickable
      const span = document.createElement("span");
      span.classList.add("collapsible");

      // Crear la flecha
      const arrow = document.createElement("span");
      arrow.classList.add("arrow", "open"); // Abierto por defecto
      arrow.textContent = "▶"; // Flecha inicial

      // Nombre de la carpeta
      const folderName = document.createElement("span");
      folderName.textContent = key;

      span.appendChild(arrow);
      span.appendChild(folderName);

      span.onclick = function () {
        const nested = this.parentElement.querySelector(".nested");
        nested.classList.toggle("active");

        if (nested.style.display === "none") {
          nested.style.display = "block";
          arrow.classList.add("open");
        } else {
          nested.style.display = "none";
          arrow.classList.remove("open");
        }
      };

      li.appendChild(span);

      // Crear el contenido hijo
      const childUl = createTree(obj[key]);
      childUl.classList.add("nested");
      childUl.style.display = "block"; // Mostrado por defecto
      li.appendChild(childUl);
    } else {
      // Es un archivo
      li.classList.add("file");
      li.textContent = key;
    }

    ul.appendChild(li);
  }

  return ul;
}
