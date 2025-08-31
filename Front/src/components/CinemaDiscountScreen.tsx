import { useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ArrowLeft, Film, Star, Clock, MapPin, Ticket, Sparkles } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface CinemaDiscountScreenProps {
  onBack: () => void;
}

export function CinemaDiscountScreen({ onBack }: CinemaDiscountScreenProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const cinemaOffers = [
    {
      id: 1,
      cinema: 'Cinépolis Recife',
      location: 'Shopping Recife',
      discount: '25%',
      pointsCost: 300,
      validUntil: '31/12/2024',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1489185078296-701a1e4263a3?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      cinema: 'Moviecom Imax',
      location: 'Shopping RioMar',
      discount: '30%',
      pointsCost: 400,
      validUntil: '31/12/2024',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      cinema: 'UCI Cinemas',
      location: 'Plaza Shopping',
      discount: '20%',
      pointsCost: 250,
      validUntil: '31/12/2024',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=200&fit=crop',
    },
  ];

  const handleRedeem = (offerId: number, pointsCost: number) => {
    setIsRedeeming(true);
    setTimeout(() => {
      alert(`Desconto resgatado com sucesso! ${pointsCost} pontos foram descontados.`);
      setIsRedeeming(false);
    }, 2000);
  };

  return (
    <div className="h-full bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-200/15 to-pink-200/15 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-pink-100/20 to-purple-100/15 rounded-full blur-xl" />
      
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
              <h2 className="text-xl font-bold text-slate-800">Descontos Cinema</h2>
              <p className="text-sm text-slate-600">Economize nas suas sessões favoritas</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-purple-100/50 shadow-sm">
            <img 
              src={logoImage}
              alt="Green Pulse Logo"
              className="w-6 h-6"
            />
          </div>
        </motion.div>

        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-500/25 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-4 translate-y-4" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Pontos disponíveis</p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-3xl font-bold">1.250</p>
                    <p className="text-lg text-purple-100">pontos</p>
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Film className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-100" />
                <p className="text-purple-100 text-sm">🎬 Aproveite nossas ofertas exclusivas!</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cinema Offers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 overflow-y-auto"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Ofertas disponíveis</h3>
          
          <div className="space-y-4">
            {cinemaOffers.map((offer, index) => (
              <motion.div 
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-purple-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="h-32 relative">
                  <img 
                    src={offer.image} 
                    alt={offer.cinema}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{offer.discount} OFF
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-slate-800 mb-2">{offer.cinema}</h4>
                      <div className="flex items-center space-x-1 text-sm text-slate-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{offer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-slate-600 font-medium">{offer.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full text-sm font-medium mb-2 shadow-sm">
                        {offer.pointsCost} pts
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>Válido até {offer.validUntil}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleRedeem(offer.id, offer.pointsCost)}
                    disabled={isRedeeming || offer.pointsCost > 1250}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 disabled:shadow-none"
                  >
                    {isRedeeming ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Resgatando...</span>
                      </div>
                    ) : offer.pointsCost > 1250 ? (
                      'Pontos insuficientes'
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Ticket className="w-4 h-4" />
                        <span>Resgatar desconto</span>
                      </div>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Tip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 p-4 bg-purple-50/80 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-sm"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-sm">🎭</span>
            </div>
            <div>
              <p className="text-sm text-purple-800 font-medium">Dica de entretenimento</p>
              <p className="text-xs text-purple-700 mt-1 leading-relaxed">
                Ganhe mais pontos usando o transporte público para ir ao cinema!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}