from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AI App Blueprint Visualizer API"
    DEBUG: bool = True
    # ["*"] para permitir todo (no recomendado en producción - cambiarlo)
    ALLOWED_ORIGINS: list = ["http://127.0.0.1:3000", "http://localhost:5173", "http://localhost:80"]  
    MODEL_PATH: str = "app/models/"

    class Config:
        env_file = ".env"

settings = Settings()
