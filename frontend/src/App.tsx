import "@css/pages/home.css";

import { useEffect, useState } from "react";
import mermaid from "mermaid";

import { Header } from "@components/Header.tsx";
import { ViewManager } from "@utils/ViewManager.tsx";
import { InitialView } from "@views/InitialView.tsx";
import { ResultView } from "@views/ResultView.tsx";
import { ErrorView } from "@views/ErrorView.tsx";

type AppState = "initial" | "processing" | "result" | "error";
type Data = {
  message: string;
  input: string;
};

function App() {
  const [appState, setAppState] = useState<AppState>("initial");
  const [data, setData] = useState<Data | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Simula una petición asíncrona
  const handleStart = async (inputData: string) => {
    setAppState("processing");

    try {
      const result = await fakeApiCall(inputData);

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
    setAppState("initial");
  };

  // Configuración de vistas
  // TODO: hacerlo en un componenete aparte
  const VIEWS = {
    initial: <InitialView onStart={handleStart} />,
    processing: (
      <ResultView data={data} onReset={handleReset} isLoading={true} />
    ),
    result: <ResultView data={data} onReset={handleReset} isLoading={false} />,
    error: <ErrorView message={errorMessage} onRetry={handleReset} />,
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true }); // Inicializar Mermaid
    // const diagram = `
    //   graph TD;
    //     A-->B;
    //     A-->C;
    //     B-->D;
    //     C-->D;
    // `;
    // const element = document.getElementById("mermaidDiagram");
    // if (element) {
    //   mermaid.render("mermaidDiagram", diagram, (svgCode) => {
    //     element.innerHTML = svgCode;
    //   });
    // }
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez, al montar el componente.

  return (
    <>
      <Header />
      <ViewManager state={appState} views={VIEWS} />
    </>
  );
}

export default App;

// Simula una llamada a API
function fakeApiCall(input: string): Promise<Data> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ message: "Respuesta de la API", input }), 2000)
  );
}
