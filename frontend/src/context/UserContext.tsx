import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Definir los tipos posibles de usuario
export type UserType = "normal" | "premium";

// Estado del contexto
export interface UserContextType {
  userType: UserType;
  toggleUserType: () => void;
}

// Crear el contexto con un valor por defecto
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export function UserProvider({ children }: UserProviderProps) {
  const [userType, setUserType] = useState<UserType>("normal");

  const toggleUserType = () => {
    setUserType((prev) => (prev === "normal" ? "premium" : "normal"));
  };

  return (
    <UserContext.Provider value={{ userType, toggleUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
