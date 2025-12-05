import type { IBlueprintService } from "./BaseBlueprintService";
import type { BlueprintResponse } from "@typings/apiResponse.ts";

export class NormalBlueprintService
  implements IBlueprintService<BlueprintResponse>
{
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async generateBlueprint(description: string): Promise<BlueprintResponse> {
    // TODO: Reemplazar con la llamada real a la API
    const response = await fetch(`${this.baseUrl}/blueprint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) throw new Error("Error al generar blueprint");
    return await response.json();
  }
}
