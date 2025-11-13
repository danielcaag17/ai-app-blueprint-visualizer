import type { StructureNode } from "@typings/structure";
import { StructureNodeComponent } from "./StructureNode";
import "./structureTree.css";

interface StructureTreeProps {
  structure?: StructureNode;
}

export function StructureTree({ structure }: StructureTreeProps) {
  if (!structure) return null;

  return (
    <div className="structure-tree">
      <ul className="tree-root">
        {Object.entries(structure).map(([key, value]) => (
          <StructureNodeComponent key={key} name={key} value={value} />
        ))}
      </ul>
    </div>
  );
}
