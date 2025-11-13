import { useUser } from "@context/useUser.ts";

export function Header() {
  const { userType, toggleUserType } = useUser();

  return (
    <header>
      <h1>AI App Blueprint Visualizer</h1>
      {/* TODO: dar estilos a esto, aunque sean simples */}
      <button onClick={toggleUserType}>
        Cambiar a {userType === "normal" ? "Premium" : "Normal"}
      </button>
      <p>Usuario actual: {userType} </p>
    </header>
  );
}
