import React from "react";

interface ViewManagerProps<T extends string> {
  state: T;
  views: Record<T, React.ReactNode>;
}

/**
 * ViewManager — componente genérico que muestra la vista
 * asociada al estado actual. Muy útil para escalar aplicaciones
 * con múltiples pantallas o flujos.
 */
export function ViewManager<T extends string>({
  state,
  views,
}: ViewManagerProps<T>) {
  return <>{views[state]}</>;
}
