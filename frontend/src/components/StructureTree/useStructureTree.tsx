import { useMemo } from "react";
import { StructureTree } from "./StructureTree";
import type { StructureNode } from "@typings/structure";

export function useStructureTree(structure?: StructureNode) {
  return useMemo(() => {
    if (!structure) return null;
    return <StructureTree structure={structure} />;
  }, [structure]);
}
