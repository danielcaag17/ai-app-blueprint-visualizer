import type { StructureNode } from "@typings/structure";

export interface BlueprintDescription {
  title: string;
  overview: string;
  components: string[];
}

export interface BlueprintAnalysis {
  app_type: string;
  recommended_technologies: string[];
  key_features: string[];
}

export interface BlueprintResponse {
  mermaidCode: string;
  description: BlueprintDescription;
  analysis: BlueprintAnalysis;
}

export interface FullBlueprintResponse extends BlueprintResponse {
  structure: StructureNode; 
}
