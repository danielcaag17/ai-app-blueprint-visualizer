export interface BlueprintDescription {
  title: string;
  overview: string;
  components: string[];
}

export interface BlueprintAnalysis {
  app_type: string;
  recommended_technologies: string[];
  key_features: string[];
}

export interface BlueprintResponse {
  mermaidCode: string;
  description: BlueprintDescription;
  analysis: BlueprintAnalysis;
}

// TODO: Reemplazar con la llamada real a la API
export async function generateBlueprintFromAPI(
  description: string
): Promise<BlueprintResponse> {
  const body = JSON.stringify({ description });
  console.log("Request body:", body);

  const response = await fetch("http://localhost:8000/api/blueprint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Error generando blueprint");
  }

  return response.json();
}

/*
// Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Retorna un dummy response
  return {
    mermaidCode: `graph TD
A[User]:::tooltipNode -->|Interacts| B[Frontend UI]
B -->|API Calls| C[Backend Server]
C -->|Queries| D[Database]
C -->|Auth| E[Authentication Service]
B -->|Displays| F[Dashboard]
F -->|Shows| G[Task List]
G -->|CRUD Operations| C

click A "https://example.com" "Este es un tooltip para User"

classDef tooltipNode fill:#f9f,stroke:#333,stroke-width:2px;
`,
    description: {
      title: "Task Management Application",
      overview:
        "A comprehensive task management system with user authentication and CRUD operations.",
      components: [
        "Frontend UI for user interaction",
        "Backend server handling business logic",
        "Database for persistent storage",
        "Authentication service for secure access",
        "Dashboard displaying task information",
      ],
    },
  };
  */
