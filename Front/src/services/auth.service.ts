import { apiClient } from './api';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '../types';
import { API_CONFIG, AUTH_CONFIG } from '../config/api.config';

// Interface para o serviço de autenticação (Princípio da Inversão de Dependência)
export interface AuthService {
  login(credentials: LoginCredentials): Promise<User>;
  register(credentials: RegisterCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  refreshToken(): Promise<void>;
}

// Implementação concreta do serviço de autenticação
export class AuthServiceImpl implements AuthService {
  private static instance: AuthServiceImpl;
  private currentUser: User | null = null;

  private constructor() {
    this.loadUserFromStorage();
  }

  // Singleton pattern
  public static getInstance(): AuthServiceImpl {
    if (!AuthServiceImpl.instance) {
      AuthServiceImpl.instance = new AuthServiceImpl();
    }
    return AuthServiceImpl.instance;
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        this.clearUserData();
      }
    }
  }

  private saveUserData(user: User, token: string, refreshToken?: string): void {
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    this.currentUser = user;
  }

  private clearUserData(): void {
    localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
    localStorage.removeItem('refreshToken');
    this.currentUser = null;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Usar FormData para login (OAuth2PasswordRequestForm)
      const formData = new FormData();
      formData.append('username', credentials.email);
      formData.append('password', credentials.password);

      const response = await apiClient.post<{ access_token: string; token_type: string; expires_in: number }>(
        API_CONFIG.AUTH.LOGIN,
        formData
      );

      const { access_token } = response.data;
      
      // Buscar dados do usuário usando o token
      const userResponse = await apiClient.get<User>(`${API_CONFIG.USER.PROFILE}?username=${credentials.email}`);
      const user = userResponse.data;
      
      this.saveUserData(user, access_token);

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    }
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    console.log('🔧 AuthService.register iniciado');
    console.log('🔧 Credenciais recebidas:', credentials);
    
    try {
      // Validar se as senhas coincidem
      if (credentials.password !== credentials.confirmPassword) {
        console.log('🔧 Erro: Senhas não coincidem');
        throw new Error('As senhas não coincidem.');
      }

      console.log('🔧 Fazendo requisição para:', API_CONFIG.AUTH.REGISTER);
      console.log('🔧 Dados enviados:', {
        username: credentials.name, // Mapear name para username
        email: credentials.email,
        password: credentials.password
      });

      const response = await apiClient.post<User>(
        API_CONFIG.AUTH.REGISTER,
        {
          username: credentials.name, // Mapear name para username
          email: credentials.email,
          password: credentials.password
        }
      );

      console.log('🔧 Resposta recebida:', response.data);
      const user = response.data;
      
      // Fazer login automático após registro
      await this.login({
        email: credentials.email,
        password: credentials.password
      });

      return user;
    } catch (error) {
      console.error('🔧 Register error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Falha no registro. Verifique os dados informados.');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_CONFIG.AUTH.LOGOUT, {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearUserData();
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && localStorage.getItem(AUTH_CONFIG.TOKEN_KEY) !== null;
  }

  async refreshToken(): Promise<void> {
    try {
      const response = await apiClient.post<{ access_token: string }>(API_CONFIG.AUTH.REFRESH, {});
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.data.access_token);
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearUserData();
      throw error;
    }
  }
}

// Export da instância singleton
export const authService = AuthServiceImpl.getInstance();
