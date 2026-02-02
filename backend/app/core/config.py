from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SOC Command Center API"
    SECRET_KEY: str = "CHANGE_THIS_SECRET_KEY_IN_PRODUCTION"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str = "sqlite:///./soc_command_center.db"

    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]

    INGEST_LOG_FOLDER: str = "./logs"
    UPLOAD_FOLDER: str = "./uploads"

settings = Settings()
