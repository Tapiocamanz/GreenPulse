// Configuração da API
export const API_CONFIG = {
  // URL base da API
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // Timeout das requisições (em ms)
  TIMEOUT: 10000,
  
  // Endpoints de autenticação
  AUTH: {
    LOGIN: '/api/auth/login/',
    REGISTER: '/api/auth/register/',
    REFRESH: '/api/auth/refresh/',
    LOGOUT: '/api/auth/logout/',
    VALIDATE: '/api/auth/validate/',
  },
  
  // Endpoints de recompensas
  REWARDS: {
    LIST: '/api/rewards/',
    ACTIVE: '/api/rewards/active/',
    AVAILABLE: '/api/rewards/available/',
    BY_ID: (id: string) => `/api/rewards/${id}/`,
    BY_CATEGORY: (category: string) => `/api/rewards/category/${category}/`,
    STATISTICS: '/api/rewards/statistics/',
  },
  
  // Endpoints de usuário
  USER: {
    PROFILE: '/api/users/',
    UPDATE: '/api/users/',
    POINTS: '/api/users/points/',
    HISTORY: '/api/users/history/',
  },
  
  // Endpoints de árvores
  TREES: {
    LIST: '/api/trees/',
    CREATE: '/api/trees/',
    BY_ID: (id: string) => `/api/trees/${id}/`,
    BY_USER: (userId: string) => `/api/trees/user/${userId}/`,
  },
  
  // Endpoints de serviços
  SERVICES: {
    IPTU: '/api/services/iptu/',
    VEM: '/api/services/vem/',
    CINEMA: '/api/services/cinema/',
    GPS: '/api/services/gps/',
    TREE_ADOPTION: '/api/services/tree-adoption/',
  },
  
  // Headers padrão
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Configuração de ambiente
export const ENV_CONFIG = {
  // Verifica se está em desenvolvimento
  IS_DEV: import.meta.env.DEV,
  
  // Verifica se está em produção
  IS_PROD: import.meta.env.PROD,
  
  // URL do frontend
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000',
  
  // Configurações de debug
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
};

// Configuração de autenticação
export const AUTH_CONFIG = {
  // Nome da chave do token no localStorage
  TOKEN_KEY: 'authToken',
  
  // Nome da chave do usuário no localStorage
  USER_KEY: 'user',
  
  // Tempo de expiração do token (em ms)
  TOKEN_EXPIRY: 60 * 60 * 1000, // 1 hora
  
  // Tempo de expiração do refresh token (em ms)
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 dias
};
