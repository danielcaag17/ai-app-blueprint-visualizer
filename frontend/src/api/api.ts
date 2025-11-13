import { createBlueprintService } from "./blueprint";
import type { UserType } from "@context/UserContext";
import type {
  BlueprintResponse,
  FullBlueprintResponse,
} from "@typings/apiResponse";

// Implementation
export async function generateBlueprintFromAPI(
  inputData: string,
  userType: UserType,
  baseUrl: string
): Promise<BlueprintResponse | FullBlueprintResponse> {
  const service = createBlueprintService(userType, baseUrl);
  const result = await service.generateBlueprint(inputData);
  return result;
}
