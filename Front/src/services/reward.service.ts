import { apiClient } from './api';
import { Reward } from '../types';
import { API_CONFIG } from '../config/api.config';

// Interface para o serviço de recompensas
export interface RewardService {
  getAllRewards(): Promise<Reward[]>;
  getActiveRewards(): Promise<Reward[]>;
  getRewardById(id: string): Promise<Reward | null>;
  getRewardsByCategory(category: string): Promise<Reward[]>;
  getAvailableRewards(): Promise<Reward[]>;
  createReward(reward: Partial<Reward>): Promise<Reward>;
  updateReward(id: string, reward: Partial<Reward>): Promise<Reward | null>;
  deleteReward(id: string): Promise<boolean>;
  getRewardsStatistics(): Promise<any>;
}

// Implementação concreta do serviço de recompensas
export class RewardServiceImpl implements RewardService {
  async getAllRewards(): Promise<Reward[]> {
    try {
      const response = await apiClient.get<Reward[]>(API_CONFIG.REWARDS.LIST);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar recompensas:', error);
      throw new Error('Falha ao carregar recompensas');
    }
  }

  async getActiveRewards(): Promise<Reward[]> {
    try {
      const response = await apiClient.get<Reward[]>(API_CONFIG.REWARDS.ACTIVE);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar recompensas ativas:', error);
      throw new Error('Falha ao carregar recompensas ativas');
    }
  }

  async getRewardById(id: string): Promise<Reward | null> {
    try {
      const response = await apiClient.get<Reward>(API_CONFIG.REWARDS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar recompensa:', error);
      return null;
    }
  }

  async getRewardsByCategory(category: string): Promise<Reward[]> {
    try {
      const response = await apiClient.get<Reward[]>(API_CONFIG.REWARDS.BY_CATEGORY(category));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar recompensas por categoria:', error);
      throw new Error('Falha ao carregar recompensas da categoria');
    }
  }

  async getAvailableRewards(): Promise<Reward[]> {
    try {
      const response = await apiClient.get<Reward[]>(API_CONFIG.REWARDS.AVAILABLE);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar recompensas disponíveis:', error);
      throw new Error('Falha ao carregar recompensas disponíveis');
    }
  }

  async createReward(reward: Partial<Reward>): Promise<Reward> {
    try {
      const response = await apiClient.post<Reward>(API_CONFIG.REWARDS.LIST, reward);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar recompensa:', error);
      throw new Error('Falha ao criar recompensa');
    }
  }

  async updateReward(id: string, reward: Partial<Reward>): Promise<Reward | null> {
    try {
      const response = await apiClient.put<Reward>(API_CONFIG.REWARDS.BY_ID(id), reward);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar recompensa:', error);
      throw new Error('Falha ao atualizar recompensa');
    }
  }

  async deleteReward(id: string): Promise<boolean> {
    try {
      await apiClient.delete(API_CONFIG.REWARDS.BY_ID(id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar recompensa:', error);
      throw new Error('Falha ao deletar recompensa');
    }
  }

  async getRewardsStatistics(): Promise<any> {
    try {
      const response = await apiClient.get(API_CONFIG.REWARDS.STATISTICS);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
}

// Instância singleton do serviço
export const rewardService = new RewardServiceImpl();
