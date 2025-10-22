// Desactivar el botón inicial que inicia el evento de generar el diagrama hasta que no haya
// input del usuario
export function handleTextareaInput({ appDescription, generateBtn }) {
  return function () {
    // appDescripton: contenido del textarea para describir la app
    const disabled = appDescription.value.trim() === "";
    generateBtn.disabled = disabled;
  };
}
