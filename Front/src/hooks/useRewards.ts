import { useState, useEffect, useCallback } from 'react';
import { rewardService } from '../services/reward.service';
import { Reward } from '../types';

// Estado das recompensas
interface RewardsState {
  rewards: Reward[];
  isLoading: boolean;
  error: string | null;
}

// Hook para gerenciar recompensas
export const useRewards = () => {
  const [state, setState] = useState<RewardsState>({
    rewards: [],
    isLoading: false,
    error: null,
  });

  // Carregar todas as recompensas
  const loadRewards = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const rewards = await rewardService.getAllRewards();
      setState({
        rewards,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        rewards: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar recompensas',
      });
    }
  }, []);

  // Carregar recompensas ativas
  const loadActiveRewards = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const rewards = await rewardService.getActiveRewards();
      setState({
        rewards,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        rewards: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar recompensas ativas',
      });
    }
  }, []);

  // Carregar recompensas disponíveis
  const loadAvailableRewards = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const rewards = await rewardService.getAvailableRewards();
      setState({
        rewards,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        rewards: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar recompensas disponíveis',
      });
    }
  }, []);

  // Carregar recompensas por categoria
  const loadRewardsByCategory = useCallback(async (category: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const rewards = await rewardService.getRewardsByCategory(category);
      setState({
        rewards,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        rewards: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar recompensas da categoria',
      });
    }
  }, []);

  // Buscar recompensa por ID
  const getRewardById = useCallback(async (id: string): Promise<Reward | null> => {
    try {
      return await rewardService.getRewardById(id);
    } catch (error) {
      console.error('Erro ao buscar recompensa:', error);
      return null;
    }
  }, []);

  // Criar nova recompensa
  const createReward = useCallback(async (reward: Partial<Reward>): Promise<Reward | null> => {
    try {
      const newReward = await rewardService.createReward(reward);
      // Atualiza a lista de recompensas
      setState(prev => ({
        ...prev,
        rewards: [...prev.rewards, newReward],
      }));
      return newReward;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao criar recompensa',
      }));
      return null;
    }
  }, []);

  // Atualizar recompensa
  const updateReward = useCallback(async (id: string, reward: Partial<Reward>): Promise<Reward | null> => {
    try {
      const updatedReward = await rewardService.updateReward(id, reward);
      if (updatedReward) {
        // Atualiza a lista de recompensas
        setState(prev => ({
          ...prev,
          rewards: prev.rewards.map(r => r.id === id ? updatedReward : r),
        }));
      }
      return updatedReward;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao atualizar recompensa',
      }));
      return null;
    }
  }, []);

  // Deletar recompensa
  const deleteReward = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await rewardService.deleteReward(id);
      if (success) {
        // Remove da lista de recompensas
        setState(prev => ({
          ...prev,
          rewards: prev.rewards.filter(r => r.id !== id),
        }));
      }
      return success;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao deletar recompensa',
      }));
      return false;
    }
  }, []);

  // Limpar erro
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Carregar recompensas na inicialização
  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  return {
    ...state,
    loadRewards,
    loadActiveRewards,
    loadAvailableRewards,
    loadRewardsByCategory,
    getRewardById,
    createReward,
    updateReward,
    deleteReward,
    clearError,
  };
};
