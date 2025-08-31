# 🚀 GreenPulse - Instruções de Configuração

## 📋 Pré-requisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL (opcional, SQLite por padrão)

## 🔧 Configuração do Backend

### 1. Instalar dependências
```bash
cd greenpulse-backend
pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
SECRET_KEY=sua_chave_secreta_aqui_muito_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=postgresql://user:password@localhost/greenpulse
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### 3. Executar migrações
```bash
alembic upgrade head
```

### 4. Iniciar o servidor
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🎨 Configuração do Frontend

### 1. Instalar dependências
```bash
cd Front
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na pasta `Front` com:
```env
VITE_API_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:3000
VITE_DEBUG=true
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

## 🌐 Endpoints da API

### Autenticação
- `POST /api/auth/login/` - Login de usuário
- `POST /api/auth/register/` - Registro de usuário
- `POST /api/auth/validate/` - Validação de token
- `POST /api/auth/refresh/` - Renovação de token
- `POST /api/auth/logout/` - Logout

### Usuários
- `GET /api/users/` - Listar usuários
- `POST /api/users/` - Criar usuário
- `GET /api/users/{id}` - Buscar usuário por ID
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Deletar usuário

### Árvores
- `GET /api/trees/` - Listar árvores
- `POST /api/trees/` - Criar árvore
- `GET /api/trees/{id}` - Buscar árvore por ID
- `PUT /api/trees/{id}` - Atualizar árvore
- `DELETE /api/trees/{id}` - Deletar árvore
- `GET /api/trees/user/{user_id}` - Buscar árvores por usuário

## 🔒 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. **Login**: Usuário faz login e recebe um token de acesso
2. **Autorização**: Token é enviado no header `Authorization: Bearer <token>`
3. **Validação**: Backend valida o token em cada requisição protegida
4. **Refresh**: Token pode ser renovado antes da expiração

## 🐛 Debugging

### Backend
- Logs aparecem no terminal onde o servidor está rodando
- Use `print()` ou `logging` para debug
- Verifique os logs de erro do FastAPI

### Frontend
- Abra DevTools (F12) no navegador
- Verifique a aba Console para erros
- Monitore a aba Network para requisições HTTP

## 📱 Funcionalidades do App

- **Autenticação**: Login/Registro de usuários
- **Adoção de Árvores**: Usuários podem adotar árvores
- **GPS**: Localização de árvores no mapa
- **Recompensas**: Sistema de pontos e benefícios
- **Serviços**: IPTU, VEM, Cinema, etc.

## 🚨 Problemas Comuns

### CORS Error
- Verifique se o backend está rodando na porta 8000
- Confirme se as origens estão configuradas corretamente

### 401 Unauthorized
- Token expirado ou inválido
- Faça login novamente

### 404 Not Found
- Endpoint não existe
- Verifique a URL da API

### 500 Internal Server Error
- Erro no backend
- Verifique os logs do servidor

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs de erro
2. Confirme as configurações de ambiente
3. Teste os endpoints individualmente
4. Verifique a conectividade entre frontend e backend

## 🔄 Fluxo de Desenvolvimento

### 1. Iniciar Backend
```bash
cd greenpulse-backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Iniciar Frontend
```bash
cd Front
npm run dev
```

### 3. Testar API
- Acesse: http://localhost:8000/docs (Swagger UI)
- Teste os endpoints de autenticação
- Verifique se o CORS está funcionando

### 4. Testar Frontend
- Acesse: http://localhost:3000
- Teste o registro e login
- Verifique se as requisições estão chegando ao backend
