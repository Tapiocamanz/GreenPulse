import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '../types';

// Hook personalizado para gerenciar estado de autenticação
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Inicializar estado de autenticação
  useEffect(() => {
    const initializeAuth = () => {
      const user = authService.getCurrentUser();
      const isAuthenticated = authService.isAuthenticated();
      
      setAuthState({
        user,
        isAuthenticated,
        isLoading: false,
      });
    };

    initializeAuth();
  }, []);

  // Função de login
  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const user = await authService.login(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // Função de registro
  const register = useCallback(async (credentials: RegisterCredentials): Promise<User> => {
    console.log('🔧 useAuth.register chamado com:', credentials);
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log('🔧 Chamando authService.register...');
      const user = await authService.register(credentials);
      console.log('🔧 authService.register retornou:', user);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return user;
    } catch (error) {
      console.error('🔧 Erro em authService.register:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // Função de logout
  const logout = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // Função para atualizar dados do usuário
  const updateUser = useCallback((user: User) => {
    setAuthState(prev => ({
      ...prev,
      user,
    }));
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  };
};
