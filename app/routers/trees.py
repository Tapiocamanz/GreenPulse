from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, auth
from ..database import get_db

router = APIRouter()

@router.post("/trees/", response_model=schemas.Tree)
def create_tree(
    tree: schemas.TreeCreate, 
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.verify_token)
):
    # Buscar o usuário atual para obter o ID
    user = crud.get_user_by_username(db, current_user)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return crud.create_tree(db, tree, user.id)

@router.get("/trees/", response_model=List[schemas.Tree])
def get_trees(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return crud.get_trees(db, skip=skip, limit=limit)

@router.get("/trees/{tree_id}", response_model=schemas.Tree)
def get_tree(tree_id: int, db: Session = Depends(get_db)):
    tree = crud.get_tree(db, tree_id)
    if tree is None:
        raise HTTPException(status_code=404, detail="Árvore não encontrada")
    return tree

@router.get("/trees/user/{user_id}", response_model=List[schemas.Tree])
def get_trees_by_user(user_id: int, db: Session = Depends(get_db)):
    return crud.get_trees_by_user(db, user_id)

@router.put("/trees/{tree_id}", response_model=schemas.Tree)
def update_tree(
    tree_id: int, 
    tree: schemas.TreeUpdate, 
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.verify_token)
):
    # Verificar se o usuário é o dono da árvore
    db_tree = crud.get_tree(db, tree_id)
    if not db_tree:
        raise HTTPException(status_code=404, detail="Árvore não encontrada")
    
    user = crud.get_user_by_username(db, current_user)
    if db_tree.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Não autorizado")
    
    return crud.update_tree(db, tree_id, tree)

@router.delete("/trees/{tree_id}")
def delete_tree(
    tree_id: int, 
    db: Session = Depends(get_db),
    current_user: str = Depends(auth.verify_token)
):
    # Verificar se o usuário é o dono da árvore
    db_tree = crud.get_tree(db, tree_id)
    if not db_tree:
        raise HTTPException(status_code=404, detail="Árvore não encontrada")
    
    user = crud.get_user_by_username(db, current_user)
    if db_tree.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Não autorizado")
    
    crud.delete_tree(db, tree_id)
    return {"message": "Árvore deletada com sucesso"}