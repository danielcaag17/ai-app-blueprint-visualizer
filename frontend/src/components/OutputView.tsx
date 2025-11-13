import "@css/pages/standard-blueprint.css";
import { useMermaid } from "@hooks/useMermaid.tsx";
import type { BlueprintResponse } from "@typings/apiResponse.ts";

interface OutputViewProps {
  data: BlueprintResponse | null;
  description: string;
  onReset: () => void;
}

export function OutputView({ data, description, onReset }: OutputViewProps) {
  // Renderiza el diagrama Mermaid cuando llegan los datos
  const diagramRef = useMermaid(data?.mermaidCode);

  return (
    <main className="output-viewport" id="outputView">
      {/* Input Column */}
      <section className="input-column">
        <textarea
          className="box"
          id="outputDescription"
          disabled
          // TODO: este placeholder podría estar en el prop como valor por defecto
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

        <div className="blueprint-description-area">
          <h2>Description</h2>
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
            <div
              className="description-container empty"
              id="descriptionContainer"
            >
              <p className="description-info">
                Blueprint description will appear here
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
