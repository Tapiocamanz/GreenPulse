from fastapi import FastAPI
from .routers import users, trees
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GreenPulse API")

app.include_router(users.router)
app.include_router(trees.router)