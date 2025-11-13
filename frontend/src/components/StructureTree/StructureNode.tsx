import { useState } from "react";
import type { StructureNode } from "@typings/structure";

interface StructureNodeProps {
  name: string;
  value: StructureNode | string;
}

export function StructureNodeComponent({ name, value }: StructureNodeProps) {
  const isFolder = typeof value === "object";
  const [collapsed, setCollapsed] = useState(false);

  if (!isFolder) {
    return (
      <li className="file">
        📄 {name}
      </li>
    );
  }

  return (
    <li className="folder">
      <div className="folder-header" onClick={() => setCollapsed(!collapsed)}>
        <span className={`arrow ${collapsed ? "" : "open"}`}>▶</span>
        <span className="folder-name">📁 {name}</span>
      </div>

      {!collapsed && (
        <ul className="nested">
          {Object.entries(value).map(([k, v]) => (
            <StructureNodeComponent key={k} name={k} value={v} />
          ))}
        </ul>
      )}
    </li>
  );
}