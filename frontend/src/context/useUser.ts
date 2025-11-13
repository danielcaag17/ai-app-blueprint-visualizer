import { useContext } from "react";
import UserContext from "./UserContext.tsx";
import type { UserContextType } from "./UserContext.tsx";

// Hook para usar el contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
