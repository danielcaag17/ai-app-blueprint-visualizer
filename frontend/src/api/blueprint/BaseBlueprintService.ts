export interface IBlueprintService<TResponse> {
  generateBlueprint(description: string): Promise<TResponse>;
}
