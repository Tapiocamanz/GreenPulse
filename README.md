
````markdown
# GreenPulse Backend

API desenvolvida em **FastAPI + PostgreSQL/PostGIS** com autenticação via **JWT** e arquitetura modular.  

---

## 🖥️ Passo 1 – Configuração do Ambiente

Abra o **VSCode**.  
Crie uma pasta para o projeto:

```bash
mkdir greenpulse-backend
cd greenpulse-backend
````

Crie e ative um ambiente virtual:

```bash
python -m venv venv

# Linux/Mac
source venv/bin/activate  

# Windows
venv\Scripts\activate
```

Instale dependências principais:

```bash
pip install fastapi uvicorn psycopg2-binary sqlalchemy alembic pydantic python-jose passlib[bcrypt]
```

---

## Passo 2 – Estrutura do Projeto

```
greenpulse-backend/
│── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── crud.py
│   └── routers/
│       ├── users.py
│       └── trees.py
│── alembic/   # para migrações do banco
│── .env       # variáveis de ambiente
```

---

Boa! 🚀 Esse segundo trecho que você montou já ficou um **guia de implementação bem completo** — do banco até o servidor rodando. Para manter no mesmo estilo dos passos anteriores (bem didático, numerado e direto), vou organizar novamente tudo em **checklist de implantação**, assim você pode usar como tutorial/documentação do projeto GreenPulse:

---

# GreenPulse API – Estrutura FastAPI + PostgreSQL/PostGIS

### Passo 3 – Conexão com o Banco

📄 Crie o arquivo `.env`:

```ini
DATABASE_URL=postgresql://usuario:senha@localhost:5432/greenpulse
SECRET_KEY=chave_super_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

📄 `app/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

---

### Passo 4 – Modelos (SQLAlchemy)

📄 `app/models.py`

```python
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    trees = relationship("Tree", back_populates="owner")

class Tree(Base):
    __tablename__ = "trees"

    id = Column(Integer, primary_key=True, index=True)
    species = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="trees")
```

---

### Passo 5 – Schemas (Pydantic)

📄 `app/schemas.py`

```python
from pydantic import BaseModel
from typing import List

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
```

---

### Passo 6 – Autenticação (JWT)

📄 `app/auth.py`

```python
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

---

### Passo 7 – CRUD

📄 `app/crud.py`

```python
from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_tree(db: Session, tree: schemas.TreeCreate, user_id: int):
    db_tree = models.Tree(**tree.dict(), owner_id=user_id)
    db.add(db_tree)
    db.commit()
    db.refresh(db_tree)
    return db_tree
```

---

### Passo 8 – Rotas

📄 `app/routers/users.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.SessionLocal)):
    return crud.create_user(db, user)
```

📄 `app/routers/trees.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

@router.post("/trees/", response_model=schemas.Tree)
def create_tree(tree: schemas.TreeCreate, db: Session = Depends(database.SessionLocal)):
    return crud.create_tree(db, tree, user_id=1)  # fixo até autenticação
```

---

### Passo 9 – Arquivo Principal

📄 `app/main.py`

```python
from fastapi import FastAPI
from .routers import users, trees
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GreenPulse API")

app.include_router(users.router)
app.include_router(trees.router)
```

---

### Passo 10 – Rodando o Servidor

```bash
uvicorn app.main:app --reload
```

🌐 Acesse a documentação interativa:
👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

Quer que eu prepare também o **Passo 11 – Dockerfile + docker-compose** para já deixar o PostgreSQL/PostGIS rodando com a API dentro de containers?

```

Quer que eu já adicione um **Table of Contents (TOC)** automático no início do README para navegação rápida?
```
