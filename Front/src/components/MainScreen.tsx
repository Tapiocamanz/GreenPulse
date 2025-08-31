import { Button } from './ui/button';
import { motion } from 'motion/react';
import { MapPin, Gift, LogOut, TrendingUp, Award, Package, TreePine } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface MainScreenProps {
  user: { cpf: string } | null;
  onNavigateToRewards: () => void;
  onNavigateToGps: () => void;
  onNavigateToProducts: () => void;
  onNavigateToTree: () => void;
  onLogout: () => void;
}

export function MainScreen({ user, onNavigateToRewards, onNavigateToGps, onNavigateToProducts, onNavigateToTree, onLogout }: MainScreenProps) {
  return (
    <div className="h-full bg-gradient-to-br from-white via-green-50/30 to-green-100/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-green-200/15 to-green-300/15 rounded-full blur-3xl bg-[rgba(249,43,43,0)]" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-green-100/20 to-green-200/15 rounded-full blur-2xl" />
      
      {/* Status bar space */}
      <div className="h-12" />
      
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-lg shadow-green-500/10 flex items-center justify-center border border-green-100/50">
                <img 
                  src={logoImage}
                  alt="Green Pulse Logo"
                  className="w-8 h-8"
                />
              </div>
              <div className="absolute inset-0 bg-green-500/5 rounded-2xl blur-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Green Pulse</h1>
              <p className="text-sm text-slate-500">CPF: {user?.cpf}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="p-3 text-slate-500 hover:text-red-500 hover:bg-red-50/80 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Welcome section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Olá! 👋</h2>
          <p className="text-slate-600">Pronto para fazer a diferença hoje?</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-green-100/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-green-700 font-medium text-sm">Pontos</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">1.250</p>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <p className="text-xs text-green-600">+50 esta semana</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-100/50 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-blue-700 font-medium text-sm">Locais</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-1">8</p>
            <p className="text-xs text-blue-600">visitados</p>
          </div>
        </motion.div>

        {/* Main Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex-1"
        >
          {/* Featured Action - Adopt a Tree */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-6"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-gradient-to-r from-green-500 to-green-400 rounded-3xl p-6 cursor-pointer shadow-xl shadow-green-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 overflow-hidden"
              onClick={onNavigateToTree}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-4 translate-y-4" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <TreePine className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-white mb-1">Adote uma árvore 🌱</h3>
                    <p className="text-green-100 text-sm">
                      Cuide, fotografe e ganhe pontos diários
                    </p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Award className="w-4 h-4 text-green-100" />
                      <span className="text-green-100 text-xs font-medium">+15 pontos por foto</span>
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <h3 className="text-lg font-semibold text-slate-800 mb-6">Outros Serviços</h3>
          
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 cursor-pointer shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
              onClick={onNavigateToGps}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">GPS Inteligente</h3>
                    <p className="text-sm text-slate-600">
                      Navegação sustentável pela cidade
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 cursor-pointer shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
              onClick={onNavigateToRewards}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Gift className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">Recompensas</h3>
                    <p className="text-sm text-slate-600">
                      Benefícios exclusivos e sustentáveis
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 cursor-pointer shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
              onClick={onNavigateToProducts}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">Produtos</h3>
                    <p className="text-sm text-slate-600">
                      Compras sustentáveis e responsáveis
                    </p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-3 p-4 bg-green-50/80 backdrop-blur-sm rounded-2xl border border-green-200/50 shadow-sm"
        >
          <div className="text-center">
            <p className="text-sm text-green-700">🌱 Contribuindo para um Recife mais sustentável</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}