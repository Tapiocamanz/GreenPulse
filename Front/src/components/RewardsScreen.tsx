import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Coins, CreditCard, Film, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { useRewards } from '../hooks/useRewards';
import { useAuth } from '../hooks/useAuth';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface RewardsScreenProps {
  onNavigateToIptu: () => void;
  onNavigateToCoins: () => void;
  onNavigateToVem: () => void;
  onNavigateToCinema: () => void;
  onBack: () => void;
}

export function RewardsScreen({ 
  onNavigateToIptu, 
  onNavigateToCoins, 
  onNavigateToVem, 
  onNavigateToCinema, 
  onBack 
}: RewardsScreenProps) {
  const { user } = useAuth();
  const { 
    rewards, 
    isLoading, 
    error, 
    loadAvailableRewards, 
    clearError 
  } = useRewards();

  // Carregar recompensas disponíveis quando a tela for montada
  useEffect(() => {
    loadAvailableRewards();
  }, [loadAvailableRewards]);

  // Limpar erro quando o usuário navegar
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const categories = [
    {
      id: 'iptu',
      title: 'Descontos IPTU',
      description: 'Reduza o valor do seu imposto',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/25',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      badge: 'Até 20% OFF',
      badgeColor: 'bg-blue-100 text-blue-700',
      onClick: onNavigateToIptu,
      rewardCount: rewards.filter(r => r.category === 'iptu').length
    },
    {
      id: 'coins',
      title: 'Troca de Moedas',
      description: 'Converta pontos em benefícios',
      icon: Coins,
      color: 'from-yellow-500 to-yellow-600',
      shadowColor: 'shadow-yellow-500/25',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      badge: `${rewards.filter(r => r.category === 'coins').length} disponíveis`,
      badgeColor: 'bg-yellow-100 text-yellow-700',
      onClick: onNavigateToCoins,
      rewardCount: rewards.filter(r => r.category === 'coins').length
    },
    {
      id: 'vem',
      title: 'Recarga VEM',
      description: 'Recarregue seu cartão de transporte',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/25',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      badge: 'Bônus disponível',
      badgeColor: 'bg-purple-100 text-purple-700',
      onClick: onNavigateToVem,
      rewardCount: rewards.filter(r => r.category === 'vem').length
    },
    {
      id: 'cinema',
      title: 'Cinema',
      description: 'Descontos em sessões de cinema',
      icon: Film,
      color: 'from-red-500 to-red-600',
      shadowColor: 'shadow-red-500/25',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      badge: 'Até 30% OFF',
      badgeColor: 'bg-red-100 text-red-700',
      onClick: onNavigateToCinema,
      rewardCount: rewards.filter(r => r.category === 'cinema').length
    }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-white via-green-50/30 to-green-100/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/15 to-green-300/15 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100/20 to-green-200/15 rounded-full blur-xl" />
      
      {/* Status bar space */}
      <div className="h-12" />
      
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/50"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Recompensas</h1>
              <p className="text-sm text-slate-600">
                Olá, {user?.name || 'Usuário'}! Escolha sua recompensa
              </p>
            </div>
          </div>
          
          {/* Botão de refresh */}
          <Button
            variant="ghost"
            size="sm"
            onClick={loadAvailableRewards}
            disabled={isLoading}
            className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/50"
          >
            <RefreshCw className={`w-5 h-5 text-slate-700 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-2 text-slate-600">Carregando recompensas...</span>
          </div>
        )}

        {/* Categories Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div
                  onClick={category.onClick}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${category.bgColor} border border-white/50 backdrop-blur-sm`}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} ${category.shadowColor}`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg ${category.textColor}`}>
                          {category.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">
                          {category.description}
                        </p>
                        {category.rewardCount > 0 && (
                          <p className="text-xs text-slate-500 mt-1">
                            {category.rewardCount} recompensa{category.rewardCount > 1 ? 's' : ''} disponível{category.rewardCount > 1 ? 'eis' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.badgeColor}`}>
                        {category.badge}
                      </span>
                      <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </div>
                  
                  {/* Sparkle effect */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-slate-500">
            Total de {rewards.length} recompensas disponíveis
          </p>
        </motion.div>
      </div>
    </div>
  );
}