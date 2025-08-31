from pydantic import BaseModel
from typing import List, Optional

class TreeBase(BaseModel):
    species: str
    latitude: float
    longitude: float

class TreeCreate(TreeBase):
    pass

class Tree(TreeBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    trees: List[Tree] = []

    class Config:
        orm_mode = True