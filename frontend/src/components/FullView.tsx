import "@css/pages/premium-blueprint.css";
import type { FullBlueprintResponse } from "@typings/apiResponse.ts";

interface FullViewProps {
  data: FullBlueprintResponse | null;
  description: string;
  onReset: () => void;
}

export function FullView({ data, description, onReset }: FullViewProps) {
  return (
    <main className="output-viewport" id="fullOutputViewport">
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
          <div className="diagram-container empty" id="diagramContainer">
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

      {/* Structure Column */}
      <section className="blueprint-column">
        <div className="blueprint-area">
          <h2>Structure</h2>
          <div className="diagram-container empty" id="structureContainer">
            <p>Your file structure will appear here</p>
          </div>
        </div>
        <button className="btn-primary">Download .zip</button>
        <div className="blueprint-description-area">
          <h2>Technologies</h2>
          <div
            className="description-container empty"
            id="technologiesContainer"
          >
            <p>Recommended technologies will appear here</p>
          </div>
        </div>
      </section>
    </main>
  );
}
