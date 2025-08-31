import os
from typing import List

class Settings:
    # Configurações de Segurança
    SECRET_KEY: str = "sua_chave_secreta_aqui_muito_segura"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # Configurações do Banco de Dados
    DATABASE_URL: str = "sqlite:///./greenpulse.db"
    
    # Configurações da API
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = True
    
    # Configurações de CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

settings = Settings()
