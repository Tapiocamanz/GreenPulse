import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface LoginScreenProps {
  onLogin: (cpf: string, password: string) => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCpf(e.target.value);
    setCpf(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cpf && password) {
      setIsLoading(true);
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(cpf, password);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white via-green-50/30 to-green-100/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/20 to-green-300/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100/30 to-green-200/20 rounded-full blur-xl" />
      
      {/* Status bar space */}
      <div className="h-12" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Button>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-8">
        {/* Logo and title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-xl shadow-green-500/10 flex items-center justify-center border border-green-100/50">
              <img 
                src={logoImage}
                alt="Green Pulse Logo"
                className="w-10 h-10"
              />
            </div>
            <div className="absolute inset-0 w-16 h-16 mx-auto bg-green-500/5 rounded-2xl blur-lg" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Bem-vindo de volta</h1>
          <p className="text-slate-600">Entre na sua conta para continuar</p>
        </motion.div>

        {/* Login form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-slate-700 font-medium">CPF</Label>
              <div className="relative">
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={handleCpfChange}
                  maxLength={14}
                  required
                  className="h-14 bg-white/80 backdrop-blur-sm border-green-200/50 focus:border-green-500 focus:ring-green-500/20 rounded-xl px-4 text-base shadow-sm transition-all duration-200 hover:bg-white/90"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-14 bg-white/80 backdrop-blur-sm border-green-200/50 focus:border-green-500 focus:ring-green-500/20 rounded-xl px-4 pr-12 text-base shadow-sm transition-all duration-200 hover:bg-white/90"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 h-auto text-slate-500 hover:text-slate-700 hover:bg-transparent"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !cpf || !password}
              className="w-full h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-xl font-semibold text-base shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Demo notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 p-4 bg-green-50/80 backdrop-blur-sm rounded-2xl border border-green-200/50 shadow-sm"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-800 font-medium">Modo demonstração</p>
                <p className="text-xs text-green-700 mt-1 leading-relaxed">
                  Qualquer CPF e senha são aceitos para testar a aplicação
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}