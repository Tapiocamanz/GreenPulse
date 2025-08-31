from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from .. import crud, schemas, auth
from ..database import get_db
from typing import List

router = APIRouter()

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@router.get("/users/", response_model=List[schemas.User])
def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    username: str = Query(None),
    db: Session = Depends(get_db)
):
    if username:
        user = crud.get_user_by_username(db, username)
        if user:
            return [user]
        return []
    return crud.get_users(db, skip=skip, limit=limit)

@router.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.put("/users/{user_id}", response_model=schemas.User)
def update_user(
    user_id: int, 
    user: schemas.UserUpdate, 
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.verify_token)
):
    # Verificar se o usuário está editando seu próprio perfil
    if current_user != crud.get_user(db, user_id).username:
        raise HTTPException(status_code=403, detail="Não autorizado")
    
    return crud.update_user(db, user_id, user)

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.verify_token)
):
    # Verificar se o usuário está deletando seu próprio perfil
    if current_user != crud.get_user(db, user_id).username:
        raise HTTPException(status_code=403, detail="Não autorizado")
    
    crud.delete_user(db, user_id)
    return {"message": "Usuário deletado com sucesso"}