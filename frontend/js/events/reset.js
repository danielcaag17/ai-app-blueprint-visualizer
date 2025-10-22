import { resetOutput } from "../dom.js";

// Volver al estado inicial con solo un textarea para describir la aplicación
export function handleReset() {
  return function () {
    resetOutput();
    document.getElementById("resultView").style.display = "none";
    document.getElementById("inputView").style.display = "flex";
  };
}
