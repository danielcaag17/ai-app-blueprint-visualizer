import "@css/pages/home.css";

import { useEffect, useState } from "react";
import mermaid from "mermaid";

import { Header } from "@components/Header.tsx";
import { ViewManager } from "@utils/ViewManager.tsx";
import { InitialView } from "@views/InitialView.tsx";
import { ResultView } from "@views/ResultView.tsx";
import { ErrorView } from "@views/ErrorView.tsx";

import { generateBlueprintFromAPI } from "api.ts";
import type { BlueprintResponse } from "api.ts";

type AppState = "initial" | "processing" | "result" | "error";

function App() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [data, setData] = useState<BlueprintResponse | null>(null);
  const [appDescription, setAppDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Simula una petición asíncrona
  const handleStart = async (inputData: string) => {
    setAppState("processing");
    setAppDescription(inputData);

    try {
      const result: BlueprintResponse = await generateBlueprintFromAPI(
        inputData
      );

      // Simulación: si input es "error", lanzamos un error
      if (inputData.toLowerCase() === "error")
        throw new Error("Simulación de error");

      setData(result);
      setAppState("result");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Error desconocido");
      }
      setAppState("error");
    } finally {
      // TODO: limpiar estados si es necesario
    }
  };

  const handleReset = () => {
    // TODO: ver si el orden importa
    setData(null);
    setAppDescription("");
    setAppState("initial");
  };

  // Configuración de vistas
  // TODO: hacerlo en un componenete aparte
  const VIEWS = {
    initial: <InitialView onStart={handleStart} />,
    processing: (
      <ResultView
        data={data}
        description={appDescription}
        onReset={handleReset}
        isLoading={true}
      />
    ),
    result: (
      <ResultView
        data={data}
        description={appDescription}
        onReset={handleReset}
        isLoading={false}
      />
    ),
    error: <ErrorView message={errorMessage} onRetry={handleReset} />,
  };

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false, // desactivar auto-render para evitar conflictos
      theme: "default",
      securityLevel: "loose",
      layout: "elk", // fuerza un layout más estable
    });
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez, al montar el componente.

  return (
    <>
      <Header />
      <ViewManager state={appState} views={VIEWS} />
    </>
  );
}

export default App;
