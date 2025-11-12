import { useState } from "react";

interface InputViewProps {
  onStart: (data: string) => void;
}

export function InputView({ onStart }: InputViewProps) {
  const [input, setInput] = useState("");

  // Handler del Generate Button
  const handleClick = () => {
    onStart(input);
  };

  const handleClear = () => {
    setInput(""); // borrar todo el contenido
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Si el usuario presiona Enter sin Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // evita salto de línea

      // Asegurar que el input no esté vacio o solo tenga espacios en blanco
      if (input.trim()) {
        handleClick(); // llama a la función de generar
      }
    }
  };

  return (
    <main className="input-viewport" id="inputView">
      {/* Input view */}
      <section className="input-area">
        <h2>Describe Your App</h2>
        <textarea
          className="description-input"
          autoFocus
          id="appDescription"
          placeholder="Describe the app you want to visualize... For example: 'A task management app with user authentication, a dashboard showing tasks, and the ability to create, edit, and delete tasks.'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="button-group">
          <button
            className="btn-primary"
            id="generateBtn"
            disabled={!input.trim()}
            onClick={handleClick}
          >
            Generate Blueprint
          </button>
          {/* TODO: faltan estilos para el botón desactivado */}
          <button
            className="btn-secondary"
            id="clearBtn"
            onClick={handleClear}
            disabled={!input.trim()} // Opcional: desactivar si el input está vacío
          >
            Clear
          </button>
        </div>
      </section>
    </main>
  );
}
