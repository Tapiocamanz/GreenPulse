import { apiClient } from './api';
import { Tree } from '../types';
import { API_CONFIG } from '../config/api.config';

// Interface para o serviço de árvores
export interface TreeService {
  getTrees(): Promise<Tree[]>;
  getTreeById(id: number): Promise<Tree>;
  createTree(tree: Omit<Tree, 'id' | 'owner_id'>): Promise<Tree>;
  updateTree(id: number, tree: Partial<Tree>): Promise<Tree>;
  deleteTree(id: number): Promise<void>;
  getTreesByUser(userId: number): Promise<Tree[]>;
}

// Implementação concreta do serviço de árvores
export class TreeServiceImpl implements TreeService {
  private static instance: TreeServiceImpl;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): TreeServiceImpl {
    if (!TreeServiceImpl.instance) {
      TreeServiceImpl.instance = new TreeServiceImpl();
    }
    return TreeServiceImpl.instance;
  }

  async getTrees(): Promise<Tree[]> {
    try {
      const response = await apiClient.get<Tree[]>(API_CONFIG.TREES.LIST);
      return response.data;
    } catch (error) {
      console.error('Error fetching trees:', error);
      throw new Error('Falha ao buscar árvores.');
    }
  }

  async getTreeById(id: number): Promise<Tree> {
    try {
      const response = await apiClient.get<Tree>(API_CONFIG.TREES.BY_ID(id.toString()));
      return response.data;
    } catch (error) {
      console.error('Error fetching tree:', error);
      throw new Error('Falha ao buscar árvore.');
    }
  }

  async createTree(tree: Omit<Tree, 'id' | 'owner_id'>): Promise<Tree> {
    try {
      const response = await apiClient.post<Tree>(API_CONFIG.TREES.CREATE, tree);
      return response.data;
    } catch (error) {
      console.error('Error creating tree:', error);
      throw new Error('Falha ao criar árvore.');
    }
  }

  async updateTree(id: number, tree: Partial<Tree>): Promise<Tree> {
    try {
      const response = await apiClient.put<Tree>(API_CONFIG.TREES.BY_ID(id.toString()), tree);
      return response.data;
    } catch (error) {
      console.error('Error updating tree:', error);
      throw new Error('Falha ao atualizar árvore.');
    }
  }

  async deleteTree(id: number): Promise<void> {
    try {
      await apiClient.delete(API_CONFIG.TREES.BY_ID(id.toString()));
    } catch (error) {
      console.error('Error deleting tree:', error);
      throw new Error('Falha ao deletar árvore.');
    }
  }

  async getTreesByUser(userId: number): Promise<Tree[]> {
    try {
      const response = await apiClient.get<Tree[]>(API_CONFIG.TREES.BY_USER(userId.toString()));
      return response.data;
    } catch (error) {
      console.error('Error fetching user trees:', error);
      throw new Error('Falha ao buscar árvores do usuário.');
    }
  }
}

// Export da instância singleton
export const treeService = TreeServiceImpl.getInstance();
