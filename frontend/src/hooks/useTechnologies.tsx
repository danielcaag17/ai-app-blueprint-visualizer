// src/hooks/useTechnologies.ts
import { useMemo } from "react";

export function useTechnologies(technologies?: string[]) {
  // Genera una lista en JSX solo si existen tecnologías
  return useMemo(() => {
    if (!technologies?.length) return null;

    return (
      <ul style={{ marginLeft: "1.5rem", color: "var(--text-secondary)" }}>
        {technologies.map((tech) => (
          <li key={tech} style={{ marginBottom: "0.5rem" }}>
            {tech}
          </li>
        ))}
      </ul>
    );
  }, [technologies]);
}
