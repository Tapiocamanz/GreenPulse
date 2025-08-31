from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, trees, auth
from .database import Base, engine
from . import auth as auth_module
from .config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GreenPulse API")

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(trees.router, prefix="/api")

# Endpoint de teste
@app.get("/")
async def root():
    return {"message": "GreenPulse API está funcionando!"}

# Endpoint de health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "GreenPulse API"}