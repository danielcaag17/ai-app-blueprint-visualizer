import "@css/pages/standard-blueprint.css";

type Data = { message: string; input: string } | null;

interface OutputViewProps {
  data: Data;
  onReset: () => void;
}

export function OutputView({ data, onReset }: OutputViewProps) {
  return (
    <main className="output-viewport" id="outputView">
      {/* Input Column */}
      <section className="input-column">
        <textarea
          className="box"
          id="outputDescription"
          disabled
          placeholder="Your app description"
        ></textarea>
        <button className="btn-secondary" id="resetBtn" onClick={onReset}>
          Restart
        </button>
      </section>

      {/* Blueprint Column */}
      <section className="blueprint-column">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <div className="blueprint-area">
          <h2>Blueprint Diagram</h2>
          <div className="diagram-container empty" id="diagramContainer">
            <p>Your blueprint diagram will appear here</p>
          </div>
        </div>
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
      </section>
    </main>
  );
}
