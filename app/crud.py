from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: schemas.UserUpdate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    
    update_data = user.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not auth.verify_password(password, user.hashed_password):
        return False
    return user

def get_tree(db: Session, tree_id: int):
    return db.query(models.Tree).filter(models.Tree.id == tree_id).first()

def get_trees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tree).offset(skip).limit(limit).all()

def get_trees_by_user(db: Session, user_id: int):
    return db.query(models.Tree).filter(models.Tree.owner_id == user_id).all()

def create_tree(db: Session, tree: schemas.TreeCreate, user_id: int):
    db_tree = models.Tree(**tree.dict(), owner_id=user_id)
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    return db_tree

def update_tree(db: Session, tree_id: int, tree: schemas.TreeUpdate):
    db_tree = get_tree(db, tree_id)
    if not db_tree:
        return None
    
    update_data = tree.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_tree, field, value)
    
    db.commit()
    db.refresh(db_tree)
    return db_tree

def delete_tree(db: Session, tree_id: int):
    db_tree = get_tree(db, tree_id)
    if db_tree:
        db.delete(db_tree)
        db.commit()
        return True
    return False