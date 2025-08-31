import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Navigation, Search, Clock, Locate, Route, Zap } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface GpsScreenProps {
  onBack: () => void;
}

export function GpsScreen({ onBack }: GpsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  const nearbyPlaces = [
    { id: 1, name: 'Prefeitura do Recife', distance: '1.2 km', type: 'governo', address: 'Rua da Aurora, 424', sustainability: 95 },
    { id: 2, name: 'Hospital da Restauração', distance: '850 m', type: 'saude', address: 'Av. Agamenon Magalhães', sustainability: 88 },
    { id: 3, name: 'Shopping Recife', distance: '2.1 km', type: 'comercio', address: 'Rua Padre Carapuceiro', sustainability: 75 },
    { id: 4, name: 'Parque da Jaqueira', distance: '1.8 km', type: 'lazer', address: 'Rua do Futuro', sustainability: 98 },
  ];

  const recentSearches = [
    'Terminal Integrado da PE-15',
    'Marco Zero do Recife',
    'Casa da Cultura',
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      governo: 'bg-blue-100 text-blue-700 border-blue-200',
      saude: 'bg-red-100 text-red-700 border-red-200',
      comercio: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lazer: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const handleStartNavigation = (place: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      alert(`Navegação iniciada para: ${place}`);
      setIsNavigating(false);
    }, 1000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-green-50/30 to-green-100/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-200/15 to-green-300/15 rounded-full blur-2xl" />
      
      {/* Status bar space */}
      <div className="h-12" />
      
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-4"
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
              <h2 className="text-xl font-bold text-slate-800">GPS Sustentável</h2>
              <p className="text-sm text-slate-600">Navegação inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-100/50 shadow-sm">
              <img 
                src={logoImage}
                alt="Green Pulse Logo"
                className="w-6 h-6"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-green-600 border-green-200 hover:bg-green-50 h-10 px-3 bg-white/80 backdrop-blur-sm"
            >
              <Locate className="w-4 h-4" />
              <span className="text-xs">Localizar</span>
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-sm border border-green-100/50"
        >
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Para onde você quer ir?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-sm bg-transparent placeholder:text-slate-400"
            />
            {searchQuery && (
              <Button size="sm" className="h-8 px-3 bg-green-500 hover:bg-green-600 rounded-xl">
                <Route className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Real Map Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative mb-4 rounded-2xl overflow-hidden border border-green-100/50 shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1615911007356-7491bb6691e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBtYXBzJTIwaW50ZXJmYWNlJTIwc3RyZWV0JTIwdmlldyUyMG5hdmlnYXRpb258ZW58MXx8fHwxNzU1NDQ2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Mapa GPS interativo do Recife"
            className="w-full h-40 object-cover"
          />
          
          {/* Current location overlay */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-green-100/50 rounded-xl p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              <div>
                <p className="font-medium text-xs text-slate-800">Você está aqui</p>
                <p className="text-xs text-slate-600">Centro, Recife</p>
              </div>
            </div>
          </div>
          
          {/* Sustainability indicator */}
          <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl shadow-lg">
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">Rota Eco</span>
            </div>
          </div>
          
          {/* Map controls */}
          <div className="absolute bottom-3 right-3 flex space-x-2">
            <Button size="sm" variant="secondary" className="h-10 w-10 p-0 bg-white/90 hover:bg-white border border-green-100/50 rounded-xl shadow-sm">
              <span className="text-lg font-medium text-slate-700">+</span>
            </Button>
            <Button size="sm" variant="secondary" className="h-10 w-10 p-0 bg-white/90 hover:bg-white border border-green-100/50 rounded-xl shadow-sm">
              <span className="text-lg font-medium text-slate-700">-</span>
            </Button>
          </div>
        </motion.div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Nearby Places */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Lugares próximos</h3>
              <Button variant="ghost" size="sm" className="text-xs text-green-600 hover:bg-green-50 rounded-xl">
                Ver todos
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {nearbyPlaces.map((place) => (
                <motion.div 
                  key={place.id} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-green-100/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm text-slate-800 truncate">{place.name}</h4>
                        <Badge className={`text-xs border ${getTypeColor(place.type)}`}>
                          {place.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-slate-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{place.distance}</span>
                        <span className="text-slate-400">•</span>
                        <span className="truncate">{place.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSustainabilityColor(place.sustainability)}`}>
                          🌱 {place.sustainability}% sustentável
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-3">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 border-green-200 text-green-600 hover:bg-green-50 rounded-xl"
                      >
                        <Route className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleStartNavigation(place.name)}
                        disabled={isNavigating}
                        className="h-8 px-3 bg-green-500 hover:bg-green-600 text-xs rounded-xl shadow-sm"
                      >
                        {isNavigating ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <Navigation className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Searches */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">Pesquisas recentes</h3>
              <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:bg-slate-100 rounded-xl">
                Limpar
              </Button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 cursor-pointer hover:bg-white/90 shadow-sm border border-green-100/50 transition-all duration-200"
                  onClick={() => setSearchQuery(search)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{search}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}