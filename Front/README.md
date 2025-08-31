# GreenPulse Frontend

Aplicação frontend do GreenPulse construída com React, TypeScript e Vite, seguindo princípios Clean Code e SOLID.

## 🏗️ Arquitetura

O projeto segue uma arquitetura limpa e modular:

```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes reutilizáveis
│   ├── screens/        # Telas da aplicação
│   └── ui/            # Componentes de UI
├── hooks/              # Hooks personalizados
├── services/           # Serviços de API e lógica de negócio
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários e helpers
└── styles/             # Estilos globais
```

## 🎯 Princípios Aplicados

### Clean Code
- **Nomes descritivos**: Funções e variáveis com nomes claros e significativos
- **Funções pequenas**: Cada função tem uma única responsabilidade
- **Comentários úteis**: Documentação apenas onde necessário
- **Estrutura clara**: Organização lógica dos arquivos

### SOLID
- **SRP (Single Responsibility)**: Cada classe/componente tem uma única responsabilidade
- **OCP (Open/Closed)**: Aberto para extensão, fechado para modificação
- **LSP (Liskov Substitution)**: Implementações podem ser substituídas
- **ISP (Interface Segregation)**: Interfaces específicas e coesas
- **DIP (Dependency Inversion)**: Dependências de abstrações, não implementações

## 🚀 Tecnologias

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Estrutura de Componentes

### Componentes Comuns
- `Button` - Botão reutilizável com variantes
- `Input` - Campo de entrada com validação
- `Card` - Container de conteúdo

### Hooks Personalizados
- `useAuth` - Gerenciamento de autenticação
- `useApi` - Chamadas de API
- `useForm` - Gerenciamento de formulários

### Serviços
- `api.ts` - Cliente HTTP centralizado
- `auth.service.ts` - Serviço de autenticação
- `reward.service.ts` - Serviço de recompensas

## 🎨 Design System

O projeto utiliza um design system consistente:

- **Cores**: Paleta verde sustentável
- **Tipografia**: Sistema de fontes hierárquico
- **Espaçamento**: Sistema de grid consistente
- **Componentes**: Biblioteca de componentes reutilizáveis

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

## 🔒 Autenticação

O sistema de autenticação inclui:

- Login com email/senha
- Registro de novos usuários
- Tokens JWT
- Refresh automático de tokens
- Proteção de rotas

## 🌐 API Integration

Integração com backend Django através de:

- Cliente HTTP centralizado
- Interceptors para tokens
- Tratamento de erros
- Tipagem TypeScript

## 🧪 Testes

```bash
# Executar testes
npm test

# Cobertura de testes
npm run test:coverage
```

## 📦 Build e Deploy

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
  