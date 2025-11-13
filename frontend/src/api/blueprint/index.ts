import { NormalBlueprintService } from "./StandardBlueprintService";
import { PremiumBlueprintService } from "./PremiumBlueprintService";
import type { IBlueprintService } from "./BaseBlueprintService";
import type {
  BlueprintResponse,
  FullBlueprintResponse,
} from "@typings/apiResponse.ts";

export type BlueprintServiceType =
  | IBlueprintService<BlueprintResponse>
  | IBlueprintService<FullBlueprintResponse>;

export const createBlueprintService = (
  userType: "normal" | "premium",
  baseUrl: string
): BlueprintServiceType => {
  if (userType === "premium") {
    return new PremiumBlueprintService(baseUrl);
  }
  return new NormalBlueprintService(baseUrl);
};
