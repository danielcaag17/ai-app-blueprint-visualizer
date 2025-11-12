import { useEffect, useRef } from "react";
import mermaid from "mermaid";

export function useMermaid(diagramCode: string | undefined) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramCode || !ref.current) return;

    const id = "mermaid-" + Date.now();
    mermaid
      .render(id, diagramCode)
      .then(({ svg }) => (ref.current!.innerHTML = svg))
      .catch((err) => (ref.current!.innerHTML = `<p>Error: ${err}</p>`));
  }, [diagramCode]);

  return ref;
}
