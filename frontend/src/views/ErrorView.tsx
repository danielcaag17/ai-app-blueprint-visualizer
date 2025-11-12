interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <section
      className="error-view"
      style={{ textAlign: "center", padding: "2rem" }}
    >
      <h2 style={{ color: "red" }}>¡Ha ocurrido un error!</h2>
      <p>{message}</p>
      <button
        onClick={onRetry}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Volver
      </button>
    </section>
  );
}
