// Configuração da API
export const API_CONFIG = {
  // URL base da API
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // Timeout das requisições (em ms)
  TIMEOUT: 10000,
  
  // Endpoints de autenticação
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    REFRESH: '/auth/refresh/',
    LOGOUT: '/auth/logout/',
    VALIDATE: '/auth/validate/',
  },
  
  // Endpoints de recompensas
  REWARDS: {
    LIST: '/rewards/',
    ACTIVE: '/rewards/active/',
    AVAILABLE: '/rewards/available/',
    BY_ID: (id: string) => `/rewards/${id}/`,
    BY_CATEGORY: (category: string) => `/rewards/category/${category}/`,
    STATISTICS: '/rewards/statistics/',
  },
  
  // Endpoints de usuário
  USER: {
    PROFILE: '/user/profile/',
    UPDATE: '/user/update/',
    POINTS: '/user/points/',
    HISTORY: '/user/history/',
  },
  
  // Endpoints de serviços
  SERVICES: {
    IPTU: '/services/iptu/',
    VEM: '/services/vem/',
    CINEMA: '/services/cinema/',
    GPS: '/services/gps/',
    TREE_ADOPTION: '/services/tree-adoption/',
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
