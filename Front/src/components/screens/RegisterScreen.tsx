import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { RegisterCredentials } from '../../types';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface RegisterScreenProps {
  onNavigate: (screen: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterCredentials>();

  const password = watch('password');

  const handleRegister = async (data: RegisterCredentials) => {
    console.log('🔄 Iniciando registro...');
    console.log('📝 Dados do formulário:', data);
    console.log('👤 Nome:', data.name);
    console.log('📧 Email:', data.email);
    console.log('🔒 Senha:', data.password);
    console.log('🔐 Confirmação:', data.confirmPassword);
    
    try {
      console.log('🚀 Chamando registerUser...');
      await registerUser(data);
      console.log('✅ Registro bem-sucedido!');
      onNavigate('main');
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Erro ao fazer cadastro',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('login')}
              className="absolute left-0 top-0 p-2 hover:bg-white/60 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-green-700" />
            </Button>
            <h1 className="text-3xl font-bold text-green-800">GreenPulse</h1>
          </div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Criar Conta</h2>
          <p className="text-green-600">Junte-se à comunidade sustentável</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          {/* Nome */}
          <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome completo"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.name?.message}
            {...register('name', {
              required: 'Nome é obrigatório',
              minLength: {
                value: 2,
                message: 'Nome deve ter pelo menos 2 caracteres',
              },
            })}
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
          />

          {/* Senha */}
          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            }
            error={errors.password?.message}
            helperText="Mínimo 8 caracteres, incluindo letra maiúscula e número"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 8,
                message: 'Senha deve ter pelo menos 8 caracteres',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Senha deve conter letra maiúscula, minúscula e número',
              },
            })}
          />

          {/* Confirmar Senha */}
          <Input
            label="Confirmar Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            }
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Confirmação de senha é obrigatória',
              validate: (value) => value === password || 'As senhas não coincidem',
            })}
          />

          {/* Erro geral */}
          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}

          {/* Botões */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              size="lg"
            >
              Criar Conta
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('login')}
            >
              Já tenho uma conta
            </Button>
          </div>
        </form>

        {/* Termos e Condições */}
        <div className="mt-6 text-center">
          <p className="text-xs text-green-600">
            Ao criar uma conta, você concorda com nossos{' '}
            <button
              type="button"
              className="text-green-700 hover:text-green-800 underline"
              onClick={() => {
                console.log('Mostrar termos e condições');
              }}
            >
              Termos de Uso
            </button>{' '}
            e{' '}
            <button
              type="button"
              className="text-green-700 hover:text-green-800 underline"
              onClick={() => {
                console.log('Mostrar política de privacidade');
              }}
            >
              Política de Privacidade
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
