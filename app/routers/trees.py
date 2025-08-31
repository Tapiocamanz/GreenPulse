from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

@router.post("/trees/", response_model=schemas.Tree)
def create_tree(tree: schemas.TreeCreate, db: Session = Depends(database.SessionLocal)):
    return crud.create_tree(db, tree, user_id=1)