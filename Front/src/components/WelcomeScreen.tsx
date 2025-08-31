import { Button } from './ui/button';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface WelcomeScreenProps {
  onNavigateToLogin: () => void;
}

export function WelcomeScreen({ onNavigateToLogin }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white via-green-50/30 to-green-100/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-green-100/30 to-green-200/20 rounded-full blur-2xl" />
      
      {/* Status bar space */}
      <div className="h-12" />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Logo container with sophisticated shadow */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl shadow-2xl shadow-green-500/10 flex items-center justify-center border border-green-100/50 backdrop-blur-sm">
              <img 
                src={logoImage}
                alt="Green Pulse Logo"
                className="w-16 h-16"
              />
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-500/5 rounded-2xl blur-xl" />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent mb-3"
          >
            Green Pulse
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-slate-600 leading-relaxed max-w-sm mx-auto"
          >
            Conectando você com a cidade sustentável
          </motion.p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-full max-w-sm space-y-4 mb-10"
        >
          <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100/50 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-base">Recompensas Inteligentes</h3>
              <p className="text-sm text-slate-600">Ganhe benefícios exclusivos</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100/50 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-base">Navegação Inteligente</h3>
              <p className="text-sm text-slate-600">Encontre locais de forma sustentável</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-full max-w-sm"
        >
          <Button 
            onClick={onNavigateToLogin}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]"
            size="lg"
          >
            Começar jornada sustentável
          </Button>
        </motion.div>
      </div>

      {/* Bottom indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pb-8 flex justify-center"
      >
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-2 h-2 bg-green-200 rounded-full" />
          <div className="w-2 h-2 bg-green-200 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}