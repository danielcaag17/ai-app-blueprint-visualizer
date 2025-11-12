import "@css/pages/standard-blueprint.css";
import { useEffect, useRef } from "react";
import type { BlueprintResponse } from "api.ts";
import mermaid from "mermaid";

interface OutputViewProps {
  data: BlueprintResponse | null;
  description: string;
  onReset: () => void;
}

export function OutputView({ data, description, onReset }: OutputViewProps) {
  const diagramRef = useRef<HTMLDivElement>(null);

  // Renderiza el diagrama Mermaid cuando llegan los datos
  useEffect(() => {
    if (!data || !diagramRef.current) return;

    const id = "mermaid-" + Date.now();

    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render(id, data.mermaidCode);
        diagramRef.current!.innerHTML = svg;
      } catch (error) {
        console.error("Error rendering Mermaid:", error);
        diagramRef.current!.innerHTML = `<p>Error rendering diagram</p>`;
      }
    };

    renderMermaid();
  }, [data]);

  return (
    <main className="output-viewport" id="outputView">
      {/* Input Column */}
      <section className="input-column">
        <textarea
          className="box"
          id="outputDescription"
          disabled
          placeholder="Your app description"
          value={description}
        ></textarea>
        <button className="btn-secondary" id="resetBtn" onClick={onReset}>
          Restart
        </button>
      </section>

      {/* Blueprint Column */}
      <section className="blueprint-column">
        <div className="blueprint-area">
          <h2>Blueprint Diagram</h2>
          <div
            ref={diagramRef}
            className="diagram-container empty"
            id="diagramContainer"
          >
            <p>Your blueprint diagram will appear here</p>
          </div>
        </div>
        {data ? (
          <div className="description-container">
            <h3>{data.description.title}</h3>
            <p>{data.description.overview}</p>

            {data.description.components?.length > 0 && (
              <>
                <h3 style={{ marginTop: "1rem" }}>Key Components:</h3>
                <ul
                  style={{
                    marginLeft: "1.5rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {data.description.components.map((c) => (
                    <li key={c} style={{ marginBottom: "0.5rem" }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <div className="blueprint-description-area">
            <h2>Description</h2>
            <div
              className="description-container empty"
              id="descriptionContainer"
            >
              <p className="description-info">
                Blueprint description will appear here
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
