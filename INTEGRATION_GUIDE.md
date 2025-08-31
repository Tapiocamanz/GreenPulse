# Guia de Integração Frontend-Backend

Este guia explica como o frontend se integra com o backend do GreenPulse.

## 🏗️ Arquitetura da Integração

### Frontend (React/TypeScript)
- **Serviços**: Camada de abstração para comunicação com API
- **Hooks**: Gerenciamento de estado e lógica de negócio
- **Componentes**: Interface do usuário
- **Configuração**: URLs e configurações centralizadas

### Backend (Django/Clean Architecture)
- **Views**: Controllers que recebem requisições HTTP
- **Use Cases**: Lógica de negócio
- **Repositories**: Acesso a dados
- **Entities**: Modelos de domínio

## 🔧 Configuração

### Frontend
1. Configure as variáveis de ambiente:
```bash
# .env
VITE_API_URL=http://localhost:8000/api
VITE_DEBUG=true
```

2. Instale as dependências:
```bash
cd Front
npm install
```

### Backend
1. Configure o ambiente Python:
```bash
cd greenpulse-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

2. Execute as migrações:
```bash
python manage.py migrate
```

3. Crie um superusuário:
```bash
python manage.py createsuperuser
```

## 🚀 Executando a Aplicação

### Backend
```bash
cd greenpulse-backend
python manage.py runserver
```
O backend estará disponível em: `http://localhost:8000`

### Frontend
```bash
cd Front
npm run dev
```
O frontend estará disponível em: `http://localhost:3000`

## 🔌 Endpoints Disponíveis

### Autenticação
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Registro
- `POST /api/auth/refresh/` - Refresh token
- `POST /api/auth/logout/` - Logout

### Recompensas
- `GET /api/rewards/` - Listar recompensas
- `GET /api/rewards/active/` - Recompensas ativas
- `GET /api/rewards/available/` - Recompensas disponíveis
- `GET /api/rewards/statistics/` - Estatísticas
- `GET /api/rewards/category/{category}/` - Por categoria
- `GET /api/rewards/{id}/` - Detalhes da recompensa

### Usuário
- `GET /api/user/profile/` - Perfil do usuário
- `GET /api/user/points/` - Pontos do usuário
- `GET /api/user/history/` - Histórico

### Serviços
- `GET /api/services/iptu/` - Serviço IPTU
- `GET /api/services/vem/` - Serviço VEM
- `GET /api/services/cinema/` - Serviço Cinema
- `GET /api/services/gps/` - Serviço GPS
- `GET /api/services/tree-adoption/` - Adoção de Árvores

## 🧪 Testando a Integração

### 1. Teste de Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 2. Teste de Recompensas
```bash
curl -X GET http://localhost:8000/api/rewards/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Teste no Frontend
1. Abra `http://localhost:3000`
2. Clique em "Entrar"
3. Use as credenciais do superusuário
4. Navegue para a tela de recompensas

## 🔄 Fluxo de Dados

### Login
1. Usuário preenche formulário no frontend
2. Frontend chama `POST /api/auth/login/`
3. Backend valida credenciais
4. Backend retorna token JWT
5. Frontend armazena token no localStorage
6. Frontend redireciona para tela principal

### Registro
1. Usuário preenche formulário de cadastro no frontend
2. Frontend valida dados (nome, email, senha, confirmação)
3. Frontend chama `POST /api/auth/register/`
4. Backend valida dados e verifica se email já existe
5. Backend cria usuário e retorna token JWT
6. Frontend armazena token e dados do usuário
7. Frontend redireciona para tela principal

### Carregamento de Recompensas
1. Componente monta no frontend
2. Hook `useRewards` é executado
3. Frontend chama `GET /api/rewards/available/`
4. Backend processa requisição
5. Backend retorna lista de recompensas
6. Frontend atualiza estado e renderiza

### Refresh Token
1. Frontend detecta token expirado (401)
2. Frontend chama `POST /api/auth/refresh/`
3. Backend valida refresh token
4. Backend retorna novo access token
5. Frontend atualiza token e retenta requisição

## 🛠️ Estrutura de Arquivos

### Frontend
```
Front/src/
├── config/
│   └── api.config.ts          # Configuração da API
├── services/
│   ├── api.ts                 # Cliente HTTP
│   ├── auth.service.ts        # Serviço de autenticação
│   └── reward.service.ts      # Serviço de recompensas
├── hooks/
│   ├── useAuth.ts             # Hook de autenticação
│   └── useRewards.ts          # Hook de recompensas
├── components/
│   ├── screens/
│   │   ├── LoginScreen.tsx    # Tela de login
│   │   ├── RewardsScreen.tsx  # Tela de recompensas
│   │   └── LoadingScreen.tsx  # Tela de carregamento
│   └── common/
│       ├── Button.tsx         # Componente de botão
│       └── Input.tsx          # Componente de input
└── types/
    └── index.ts               # Tipos TypeScript
```

### Backend
```
greenpulse-backend/
├── domain/
│   ├── entities/
│   │   ├── user.py            # Entidade User
│   │   └── reward.py          # Entidade Reward
│   ├── repositories/
│   │   ├── user_repository.py # Interface UserRepository
│   │   └── reward_repository.py # Interface RewardRepository
│   └── use_cases/
│       ├── auth_use_cases.py  # Casos de uso de auth
│       └── reward_use_cases.py # Casos de uso de rewards
├── application/
│   ├── services/
│   │   └── auth_service_impl.py # Implementação do AuthService
│   └── views/
│       └── auth_views.py      # Controllers da API
├── infrastructure/
│   └── repositories/
│       ├── django_user_repository.py # Implementação UserRepository
│       └── django_reward_repository.py # Implementação RewardRepository
└── core/
    ├── settings.py            # Configurações Django
    └── urls.py                # URLs da aplicação
```

## 🔒 Segurança

### Autenticação JWT
- Tokens de acesso com expiração de 1 hora
- Refresh tokens com expiração de 7 dias
- Renovação automática de tokens
- Logout com invalidação de tokens

### CORS
- Configurado para permitir requisições do frontend
- Headers de autorização permitidos
- Métodos HTTP permitidos: GET, POST, PUT, DELETE

### Validação
- Validação de entrada no backend
- Sanitização de dados
- Tratamento de erros estruturado

## 🐛 Debugging

### Frontend
1. Abra DevTools (F12)
2. Vá para aba Network
3. Monitore as requisições para `/api/`
4. Verifique os logs no console

### Backend
1. Monitore os logs do Django
2. Use `print()` ou `logging` para debug
3. Verifique o arquivo `db.sqlite3` para dados

### Erros Comuns
- **CORS Error**: Verifique configuração CORS no Django
- **401 Unauthorized**: Token expirado ou inválido
- **404 Not Found**: Endpoint não existe
- **500 Internal Server Error**: Erro no backend

## 📈 Próximos Passos

1. **Implementar repositórios completos** com Django ORM
2. **Adicionar validação robusta** de entrada
3. **Implementar testes unitários** para ambas as camadas
4. **Adicionar logging estruturado**
5. **Configurar CI/CD pipeline**
6. **Implementar cache** para melhor performance
7. **Adicionar documentação da API** (Swagger/OpenAPI)

## 🤝 Contribuição

Para contribuir com a integração:

1. Siga os princípios Clean Code e SOLID
2. Mantenha a separação de responsabilidades
3. Adicione testes para novas funcionalidades
4. Documente mudanças na API
5. Atualize este guia conforme necessário
