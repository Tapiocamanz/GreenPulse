import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { MainScreen } from './components/MainScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { IptuDiscountScreen } from './components/IptuDiscountScreen';
import { CoinExchangeScreen } from './components/CoinExchangeScreen';
import { VemRechargeScreen } from './components/VemRechargeScreen';
import { CinemaDiscountScreen } from './components/CinemaDiscountScreen';
import { GpsScreen } from './components/GpsScreen';
import { ProductsServicesScreen } from './components/ProductsServicesScreen';
import { TreeAdoptionScreen } from './components/TreeAdoptionScreen';
import { LoadingScreen } from './components/screens/LoadingScreen';

export type Screen = 'welcome' | 'login' | 'register' | 'main' | 'rewards' | 'iptu' | 'coins' | 'vem' | 'cinema' | 'gps' | 'products' | 'tree';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Navegação baseada no estado de autenticação
  useEffect(() => {
    if (isLoading) {
      // Aguarda carregamento inicial
      return;
    }

    if (isAuthenticated && user) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('welcome');
    }
  }, [isAuthenticated, user, isLoading]);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentScreen('welcome');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Tela de carregamento inicial
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      {/* Container do dispositivo móvel */}
      <div className="relative">
        {/* Moldura do celular */}
        <div className="w-[375px] h-[812px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          {/* Tela do celular */}
          <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden relative">
            {/* Notch (entalhe) do iPhone */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-10"></div>
            
            {/* Conteúdo das telas */}
            <div className="size-full">
              {currentScreen === 'welcome' && (
                <WelcomeScreen onNavigateToLogin={() => navigateToScreen('login')} />
              )}
              {currentScreen === 'login' && (
                <LoginScreen 
                  onNavigate={(screen) => navigateToScreen(screen as Screen)} 
                />
              )}
              {currentScreen === 'register' && (
                <RegisterScreen 
                  onNavigate={(screen) => navigateToScreen(screen as Screen)} 
                />
              )}
              {currentScreen === 'main' && (
                <MainScreen 
                  user={user}
                  onNavigateToRewards={() => navigateToScreen('rewards')}
                  onNavigateToGps={() => navigateToScreen('gps')}
                  onNavigateToProducts={() => navigateToScreen('products')}
                  onNavigateToTree={() => navigateToScreen('tree')}
                  onLogout={handleLogout}
                />
              )}
              {currentScreen === 'rewards' && (
                <RewardsScreen 
                  onNavigateToIptu={() => navigateToScreen('iptu')}
                  onNavigateToCoins={() => navigateToScreen('coins')}
                  onNavigateToVem={() => navigateToScreen('vem')}
                  onNavigateToCinema={() => navigateToScreen('cinema')}
                  onBack={() => navigateToScreen('main')}
                />
              )}
              {currentScreen === 'iptu' && (
                <IptuDiscountScreen onBack={() => navigateToScreen('rewards')} />
              )}
              {currentScreen === 'coins' && (
                <CoinExchangeScreen onBack={() => navigateToScreen('rewards')} />
              )}
              {currentScreen === 'vem' && (
                <VemRechargeScreen onBack={() => navigateToScreen('rewards')} />
              )}
              {currentScreen === 'cinema' && (
                <CinemaDiscountScreen onBack={() => navigateToScreen('rewards')} />
              )}
              {currentScreen === 'gps' && (
                <GpsScreen onBack={() => navigateToScreen('main')} />
              )}
              {currentScreen === 'products' && (
                <ProductsServicesScreen onBack={() => navigateToScreen('main')} />
              )}
              {currentScreen === 'tree' && (
                <TreeAdoptionScreen onBack={() => navigateToScreen('main')} />
              )}
            </div>
          </div>
        </div>
        
        {/* Botão Home */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
}