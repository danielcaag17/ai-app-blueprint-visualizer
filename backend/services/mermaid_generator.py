class MermaidService:
    def generate_mermaid_and_metadata(self, analysis: dict) -> tuple:
        # Puedes generar Mermaid dinámicamente según análisis si quieres
        mermaid_code = """
graph TD
A[Usuario]:::tooltipNode -->|Hace reserva| B[Frontend Web]
B -->|Solicita API| C[Backend FastAPI]
C -->|Consulta| D[Base de Datos SQLite]
C -->|Autenticación| E[Servicio de Usuarios]
B -->|Muestra| F[Panel de Reservas]
F -->|Gestiona| G[Listado de Reservas]
G -->|Operaciones CRUD| C

click A "https://ejemplo.com" "Este es un tooltip para Usuario"
classDef tooltipNode fill:#f9f,stroke:#333,stroke-width:2px;
"""

        title = "Aplicación de Gestión de Reservas"
        overview = "Sistema para gestionar reservas en restaurantes, incluyendo usuarios y notificaciones."
        components = [
            "Frontend web para interacción con el usuario",
            "Backend con FastAPI para la lógica de negocio",
            "Base de datos SQLite para persistencia",
            "Sistema de autenticación para usuarios",
            "Panel de reservas con funcionalidades CRUD"
        ]

        return mermaid_code.strip(), title, overview, components
