
# GreenPulse

**GreenPulse** é uma aplicação backend construída com **FastAPI** e **SQLite**, projetada para gerenciar usuários e posts, fornecendo uma API REST completa.

---

## 🗂 Estrutura do Projeto

```

GreenPulse/
│
├─ app/
│  ├─ main.py          # Inicializa a aplicação FastAPI
│  ├─ models.py        # Modelos do banco de dados (ORM)
│  ├─ schemas.py       # Schemas Pydantic para validação
│  ├─ crud.py          # Operações CRUD do banco
│  ├─ database.py      # Conexão com o banco SQLite
│  └─ init\_db.py       # Script para criar as tabelas do banco
│
├─ greenpulse.db       # Banco de dados SQLite
├─ requirements.txt    # Dependências do projeto
└─ .env                # Variáveis de ambiente

````

---

## ⚙️ Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://github.com/Tapiocamanz/GreenPulse.git
cd GreenPulse
````

2. Crie e ative um ambiente virtual:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

---

## 🗄 Configuração do Banco de Dados

O banco de dados usado é **SQLite** (`greenpulse.db`).

**Arquivo `app/database.py`:**

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./greenpulse.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

### Inicialização das tabelas

```python
# app/init_db.py
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso!")
```

Para criar as tabelas:

```bash
python -m app.init_db
```

---

## 🧩 Modelos (ORM)

**app/models.py:**

```python
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="posts")
```

---

## 📦 Schemas Pydantic

**app/schemas.py** define os modelos de dados para validação de entrada/saída:

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class PostBase(BaseModel):
    title: str
    user_id: int

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    class Config:
        orm_mode = True
```

---

## 🔧 CRUD (Operações do Banco)

**app/crud.py** exemplo:

```python
from sqlalchemy.orm import Session
from . import models, schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()
```

---

## 🚀 Rodando a Aplicação

```bash
uvicorn app.main:app --reload
```

* API disponível em: [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Swagger UI (documentação interativa): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* ReDoc (documentação detalhada): [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🔍 Consultas no Banco de Dados

### Usando SQLite diretamente

```bash
sqlite3 greenpulse.db
```

Comandos SQL:

```sql
.tables                 -- listar tabelas
.schema users           -- ver estrutura da tabela
SELECT * FROM users;    -- consultar dados
.exit                   -- sair do SQLite
```

### Usando Python

```python
import sqlite3

conn = sqlite3.connect("greenpulse.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row)

conn.close()
```

---

## 📌 Endpoints da API

### Usuários (`/users`)

* **GET /users** – Lista todos os usuários
* **POST /users** – Cria um novo usuário

Exemplo POST JSON:

```json
{
  "name": "Aldebaran"
}
```

---

### Posts (`/posts`)

* **GET /posts** – Lista todos os posts
* **POST /posts** – Cria um novo post

Exemplo POST JSON:

```json
{
  "title": "Meu primeiro post",
  "user_id": 1
}
```

---

## ✅ Testando a API

1. Abra [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
2. Use o Swagger UI para testar **GET** e **POST** de usuários e posts.
3. Confira se os dados foram inseridos no `greenpulse.db`.

---

## 💡 Observações

* Todos os modelos têm `orm_mode = True` para compatibilidade com SQLAlchemy.
* O SQLite é recomendado apenas para desenvolvimento; para produção, prefira MySQL ou PostgreSQL.
* Você pode adicionar autenticação, filtros e paginação facilmente usando FastAPI.

```

---

Se você quiser, Aldebaran, posso criar **uma versão ainda mais detalhada**, incluindo **exemplos de resposta completa, erros comuns (como 422), e relacionamentos entre tabelas** — pronta para ser publicada como documentação oficial.  

Quer que eu faça isso também?
```
