# GreenPulse - Aplicação Sustentável

Aplicação completa para incentivar práticas sustentáveis através de recompensas e gamificação, reestruturada seguindo princípios Clean Code e SOLID com **integração completa** entre frontend e backend.

## 🎯 Sobre o Projeto

GreenPulse é uma aplicação que incentiva práticas sustentáveis através de:
- **Sistema de Recompensas**: Pontos por ações sustentáveis
- **Gamificação**: Desafios e conquistas
- **Integração com Serviços**: IPTU, VEM, Cinema, etc.
- **Adoção de Árvores**: Sistema de plantio virtual
- **GPS e Localização**: Mapeamento de ações sustentáveis

## 🚀 Setup Rápido

### Opção 1: Setup Automático
```bash
# Execute o script de setup
python setup_integration.py
```

### Opção 2: Setup Manual

#### Pré-requisitos
- Node.js 18+
- Python 3.11+
- npm ou yarn

#### Frontend
```bash
cd Front
npm install
npm run dev
```

#### Backend
```bash
cd greenpulse-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🧪 Testando a Integração

### Teste Automático
```bash
python test_integration.py
```

### Teste Manual
1. Inicie o backend: `http://localhost:8000`
2. Inicie o frontend: `http://localhost:3000`
3. Faça login com: `admin@example.com` / `admin123`
4. Navegue para a tela de recompensas

## 🏗️ Arquitetura Reestruturada

### Frontend (React/TypeScript)
```
Front/
├── src/
│   ├── components/          # Componentes React
│   │   ├── common/         # Componentes reutilizáveis
│   │   ├── screens/        # Telas da aplicação
│   │   └── ui/            # Componentes de UI
│   ├── hooks/              # Hooks personalizados
│   ├── services/           # Serviços de API
│   ├── types/              # Definições TypeScript
│   ├── config/             # Configurações
│   └── utils/              # Utilitários
```

### Backend (Django/Clean Architecture)
```
greenpulse-backend/
├── domain/                 # Camada de Domínio
│   ├── entities/          # Entidades de negócio
│   ├── repositories/      # Interfaces dos repositórios
│   └── use_cases/         # Casos de uso
├── application/            # Camada de Aplicação
│   ├── services/          # Implementações de serviços
│   └── views/             # Controllers
└── infrastructure/         # Camada de Infraestrutura
    └── repositories/      # Implementações dos repositórios
```

## 🎯 Princípios Aplicados

### Clean Code
- ✅ **Nomes descritivos**: Funções e variáveis com nomes claros
- ✅ **Funções pequenas**: Cada função tem uma única responsabilidade
- ✅ **Comentários úteis**: Documentação apenas onde necessário
- ✅ **Estrutura clara**: Organização lógica dos arquivos

### SOLID
- ✅ **SRP (Single Responsibility)**: Cada classe tem uma única responsabilidade
- ✅ **OCP (Open/Closed)**: Aberto para extensão, fechado para modificação
- ✅ **LSP (Liskov Substitution)**: Implementações podem ser substituídas
- ✅ **ISP (Interface Segregation)**: Interfaces específicas e coesas
- ✅ **DIP (Dependency Inversion)**: Dependências de abstrações

### Clean Architecture
- ✅ **Independência de Frameworks**: Domínio não depende do Django
- ✅ **Testabilidade**: Fácil de testar cada camada isoladamente
- ✅ **Independência de UI**: Lógica de negócio independente da interface
- ✅ **Independência de Banco**: Domínio não conhece detalhes de persistência

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis

### Backend
- **Django 5.2+** - Framework web
- **Django REST Framework** - API REST
- **Python 3.11+** - Linguagem de programação
- **JWT** - Autenticação por tokens
- **SQLite/PostgreSQL** - Banco de dados
- **Pillow** - Processamento de imagens

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Python 3.11+
- Git

### Frontend
```bash
cd Front
npm install
npm run dev
```

### Backend
```bash
cd greenpulse-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🔧 Funcionalidades Implementadas

### ✅ Sistema de Autenticação
- Login/Registro com JWT
- Refresh automático de tokens
- Proteção de rotas

### ✅ Componentes Reutilizáveis
- Button com variantes
- Input com validação
- Card container
- Loading states

### ✅ Hooks Personalizados
- useAuth para autenticação
- useApi para chamadas HTTP
- useForm para formulários

### ✅ Serviços Centralizados
- Cliente HTTP com interceptors
- Serviço de autenticação
- Tratamento de erros

### ✅ Entidades de Domínio
- User com validações
- Reward com categorias
- Interfaces de repositórios

### ✅ Casos de Uso
- Autenticação de usuários
- Gerenciamento de recompensas
- Validação de tokens

### ✅ Repositórios
- Interface abstrata
- Implementação Django
- Conversão de entidades

## 📱 Telas Disponíveis

1. **Welcome** - Tela de boas-vindas
2. **Login** - Autenticação de usuário
3. **Main** - Tela principal
4. **Rewards** - Sistema de recompensas
5. **GPS** - Localização e mapas
6. **Products/Services** - Produtos e serviços
7. **Tree Adoption** - Adoção de árvores
8. **Cinema Discount** - Descontos de cinema
9. **VEM Recharge** - Recarga de cartão
10. **Coin Exchange** - Troca de moedas
11. **IPTU Discount** - Desconto de IPTU

## 🔌 Integração Frontend-Backend

### Fluxo de Dados
1. **Login**: Frontend envia credenciais → Backend valida → Retorna JWT → Frontend armazena token
2. **Recompensas**: Frontend chama API → Backend processa → Retorna dados → Frontend renderiza
3. **Refresh**: Frontend detecta token expirado → Chama refresh → Backend retorna novo token

### Endpoints da API

#### Autenticação
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Registro
- `POST /api/auth/refresh/` - Refresh token
- `POST /api/auth/logout/` - Logout

#### Recompensas
- `GET /api/rewards/` - Listar recompensas
- `GET /api/rewards/active/` - Recompensas ativas
- `GET /api/rewards/available/` - Recompensas disponíveis
- `GET /api/rewards/statistics/` - Estatísticas
- `GET /api/rewards/category/{category}/` - Por categoria
- `GET /api/rewards/{id}/` - Detalhes da recompensa

#### Usuário
- `GET /api/user/profile/` - Perfil do usuário
- `GET /api/user/points/` - Pontos do usuário
- `GET /api/user/history/` - Histórico

#### Serviços
- `GET /api/services/iptu/` - Serviço IPTU
- `GET /api/services/vem/` - Serviço VEM
- `GET /api/services/cinema/` - Serviço Cinema
- `GET /api/services/gps/` - Serviço GPS
- `GET /api/services/tree-adoption/` - Adoção de Árvores

## 🛠️ Scripts Úteis

### Setup Automático
```bash
python setup_integration.py
```

### Teste de Integração
```bash
python test_integration.py
```

### Inicialização Rápida
```bash
# Windows
start_greenpulse.bat

# Unix/Linux/Mac
./start_greenpulse.sh
```

## 🧪 Testes

### Frontend
```bash
cd Front
npm test
npm run test:coverage
```

### Backend
```bash
cd greenpulse-backend
python manage.py test
coverage run --source='.' manage.py test
coverage report
```

### Integração
```bash
python test_integration.py
```

## 📊 Benefícios da Reestruturação

### ✅ Manutenibilidade
- Código organizado e legível
- Fácil de entender e modificar
- Separação clara de responsabilidades

### ✅ Testabilidade
- Cada camada pode ser testada isoladamente
- Mocks e stubs fáceis de implementar
- Cobertura de testes abrangente

### ✅ Escalabilidade
- Fácil adicionar novas funcionalidades
- Componentes reutilizáveis
- Arquitetura extensível

### ✅ Flexibilidade
- Troca de implementações sem afetar outras camadas
- Dependências injetadas
- Interfaces bem definidas

## 🚀 Próximos Passos

1. **Implementar testes unitários** para todas as camadas
2. **Adicionar validação de entrada** mais robusta
3. **Implementar logging** estruturado
4. **Configurar CI/CD** pipeline
5. **Adicionar documentação** da API (Swagger)
6. **Implementar cache** para melhor performance
7. **Configurar monitoramento** e métricas

## 📚 Documentação

- [Guia de Integração](INTEGRATION_GUIDE.md) - Documentação completa da integração
- [Frontend README](Front/README.md) - Documentação do frontend
- [Backend README](greenpulse-backend/README.md) - Documentação do backend

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente seguindo os princípios Clean Code e SOLID
4. Adicione testes
5. Execute os testes de integração antes de commitar
6. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**GreenPulse** - Transformando práticas sustentáveis em recompensas! 🌱
