from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from .. import crud, schemas, auth
from ..database import get_db
from ..config import settings

router = APIRouter()

@router.post("/auth/login/", response_model=schemas.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    }

@router.post("/auth/register/", response_model=schemas.User)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verificar se o usuário já existe
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nome de usuário já registrado"
        )
    
    return crud.create_user(db, user)

@router.post("/auth/validate/")
async def validate_token(token: str):
    try:
        username = auth.verify_token(token)
        return {"valid": True, "username": username}
    except HTTPException:
        return {"valid": False, "username": None}

@router.post("/auth/refresh/", response_model=schemas.Token)
async def refresh_token(refresh_token: str):
    # Implementar lógica de refresh token
    # Por enquanto, retorna erro
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Refresh token não implementado ainda"
    )

@router.post("/auth/logout/")
async def logout():
    # Implementar lógica de logout (invalidação de token)
    return {"message": "Logout realizado com sucesso"}
