import type { IBlueprintService } from "./BaseBlueprintService";
import type { FullBlueprintResponse } from "@typings/apiResponse.ts";

export class PremiumBlueprintService
  implements IBlueprintService<FullBlueprintResponse>
{
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async generateBlueprint(description: string): Promise<FullBlueprintResponse> {
    // TODO: Reemplazar con la llamada real a la API
    const response = await fetch(`${this.baseUrl}/full-blueprint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    if (!response.ok) throw new Error("Error al generar blueprint premium");
    return await response.json();
  }
}
