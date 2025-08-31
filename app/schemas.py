from pydantic import BaseModel
from typing import List, Optional

class TreeBase(BaseModel):
    species: str
    latitude: float
    longitude: float

class TreeCreate(TreeBase):
    pass

class TreeUpdate(BaseModel):
    species: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class Tree(TreeBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None

class User(UserBase):
    id: int
    trees: List[Tree] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int

class TokenData(BaseModel):
    username: Optional[str] = None