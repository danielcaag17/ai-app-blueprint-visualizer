import { useContext } from "react";
import UserContext from "@context/UserContext.tsx";
import type { UserContextType } from "@context/UserContext.tsx";

// Hook para usar el contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
