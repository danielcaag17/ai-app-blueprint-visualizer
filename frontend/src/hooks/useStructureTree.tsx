import React, { useMemo } from "react";
import type { StructureNode } from "@typings/structure.ts";

function renderNode(node: StructureNode): React.JSX.Element {
  return (
    <ul style={{ listStyleType: "none", marginLeft: "1rem" }}>
      {Object.entries(node).map(([key, value]) => {
        const isFolder = typeof value === "object";
        // const isFile = typeof value === "string";

        return (
          <li key={key} style={{ marginBottom: "0.4rem" }}>
            {isFolder ? (
              <>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "var(--accent-color, #0077ff)",
                  }}
                >
                  📁 {key}
                </span>
                {renderNode(value)}
              </>
            ) : (
              <span style={{ color: "var(--text-secondary)" }}>📄 {key}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function useStructureTree(structure?: StructureNode) {
  return useMemo(() => {
    if (!structure) return null;
    return <div className="structure-tree">{renderNode(structure)}</div>;
  }, [structure]);
}
