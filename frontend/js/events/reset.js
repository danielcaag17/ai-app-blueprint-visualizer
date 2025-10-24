// Volver al estado inicial con solo un textarea para describir la aplicación
export function handleReset() {
  return function () {
    //TODO: por ahora lo compro, pero tendrá que eliminar o no el input previo del usuario
    window.location.href = "/frontend/home.html";
  };
}
