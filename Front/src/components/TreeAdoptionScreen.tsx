import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { ArrowLeft, TreePine, Camera, Calendar, Award, Heart, Droplets, Sun, TrendingUp, Upload, Image } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface TreeAdoptionScreenProps {
  onBack: () => void;
}

export function TreeAdoptionScreen({ onBack }: TreeAdoptionScreenProps) {
  const [selectedTab, setSelectedTab] = useState('minha-arvore');
  const [isUploading, setIsUploading] = useState(false);

  // Mock data para a árvore do usuário
  const myTree = {
    id: 1,
    name: 'Minha Ipê Amarelo',
    species: 'Handroanthus albus',
    adoptedDate: '2024-10-15',
    age: 95, // dias
    health: 92,
    height: 1.2, // metros
    co2Absorbed: 45.7, // kg
    dailyPoints: 15,
    totalPoints: 1425,
    location: 'Parque da Jaqueira, Recife',
    lastWatered: '2024-01-16',
    nextWatering: '2024-01-19',
    photos: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
        date: '2024-01-16',
        points: 15,
        description: 'Crescimento saudável após chuva'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=300&fit=crop',
        date: '2024-01-10',
        points: 15,
        description: 'Novas folhas brotando'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=300&h=300&fit=crop',
        date: '2024-01-05',
        points: 15,
        description: 'Primeira foto após adoção'
      }
    ]
  };

  const availableTrees = [
    {
      id: 2,
      species: 'Pau-brasil',
      location: 'Parque Dois Irmãos',
      age: 'Muda',
      description: 'Árvore símbolo do Brasil, precisa de cuidados especiais',
      adoptionCost: 200, // pontos
      dailyPoints: 20,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      species: 'Cajueiro',
      location: 'Jardim Botânico',
      age: 'Jovem',
      description: 'Árvore frutífera nativa, ótima para biodiversidade',
      adoptionCost: 150,
      dailyPoints: 18,
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=300&h=200&fit=crop'
    }
  ];

  const handlePhotoUpload = () => {
    setIsUploading(true);
    // Simular upload
    setTimeout(() => {
      setIsUploading(false);
      alert('Foto enviada com sucesso! +15 pontos adicionados à sua conta.');
    }, 2000);
  };

  const calculateDaysAdopted = (adoptedDate: string) => {
    const adopted = new Date(adoptedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - adopted.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600 bg-green-100';
    if (health >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

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
          className="flex items-center justify-between mb-6"
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
              <h2 className="text-xl font-bold text-slate-800">Minhas Árvores</h2>
              <p className="text-sm text-slate-600">Cuide e acompanhe o crescimento</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-green-100/50 shadow-sm">
            <img 
              src={logoImage}
              alt="Green Pulse Logo"
              className="w-6 h-6"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex space-x-2 mb-6"
        >
          <Button
            variant={selectedTab === 'minha-arvore' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTab('minha-arvore')}
            className={`flex-1 h-10 rounded-xl transition-all duration-200 ${
              selectedTab === 'minha-arvore'
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-white/80 hover:bg-white border-green-200 text-slate-700'
            }`}
          >
            <TreePine className="w-4 h-4 mr-2" />
            Minha Árvore
          </Button>
          <Button
            variant={selectedTab === 'adotar' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTab('adotar')}
            className={`flex-1 h-10 rounded-xl transition-all duration-200 ${
              selectedTab === 'adotar'
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                : 'bg-white/80 hover:bg-white border-green-200 text-slate-700'
            }`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Adotar
          </Button>
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedTab === 'minha-arvore' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-6"
            >
              {/* Tree Info Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-green-100/50">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <TreePine className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-slate-800 mb-1">{myTree.name}</h3>
                    <p className="text-sm text-slate-600 mb-1">{myTree.species}</p>
                    <p className="text-xs text-slate-500">{myTree.location}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(myTree.health)}`}>
                    {myTree.health}% saudável
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Idade</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{calculateDaysAdopted(myTree.adoptedDate)} dias</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Altura</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{myTree.height}m</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">Pontos</span>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{myTree.totalPoints}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm">🌍</span>
                      <span className="text-sm font-medium text-green-800">CO₂ Absorvido</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{myTree.co2Absorbed}kg</p>
                  </div>
                </div>

                {/* Daily Care */}
                <div className="bg-green-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-800">Cuidados Diários</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">+{myTree.dailyPoints} pts/dia</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Última rega:</span>
                      <span className="font-medium text-slate-800">{myTree.lastWatered}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Próxima rega:</span>
                      <span className="font-medium text-green-600">{myTree.nextWatering}</span>
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center">
                  <Camera className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-medium text-slate-800 mb-2">Compartilhe o Progresso</h4>
                  <p className="text-sm text-slate-600 mb-4">Tire uma foto da sua árvore e ganhe pontos diários!</p>
                  <Button 
                    onClick={handlePhotoUpload}
                    disabled={isUploading}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/25"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Enviar Foto (+15 pts)</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-green-100/50">
                <h4 className="font-semibold text-lg text-slate-800 mb-4">Galeria de Fotos</h4>
                <div className="grid grid-cols-1 gap-4">
                  {myTree.photos.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-green-100/50">
                      <img 
                        src={photo.url} 
                        alt={photo.description}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-800">{photo.date}</span>
                          <Badge className="bg-green-100 text-green-700">+{photo.points} pts</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{photo.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4"
            >
              {/* Available Trees */}
              {availableTrees.map((tree, index) => (
                <motion.div
                  key={tree.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                >
                  <img 
                    src={tree.image} 
                    alt={tree.species}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-800 mb-1">{tree.species}</h3>
                        <p className="text-sm text-slate-600 mb-1">{tree.location}</p>
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                          {tree.age}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
                          {tree.adoptionCost} pts
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-slate-600">+{tree.dailyPoints}/dia</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-4">{tree.description}</p>
                    
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/25"
                      disabled={tree.adoptionCost > 1250}
                    >
                      {tree.adoptionCost > 1250 ? 'Pontos Insuficientes' : 'Adotar Árvore'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}