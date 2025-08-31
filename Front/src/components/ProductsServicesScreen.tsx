import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, Package, Star, ShoppingBag, Heart, Leaf, Truck, Award } from 'lucide-react';
import logoImage from 'figma:asset/9916bafc09ff45c5d539d5986d0819c925761532.png';

interface ProductsServicesScreenProps {
  onBack: () => void;
}

export function ProductsServicesScreen({ onBack }: ProductsServicesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 'todos', name: 'Todos', count: 24 },
    { id: 'eco', name: 'Eco-Friendly', count: 12 },
    { id: 'casa', name: 'Casa & Jardim', count: 8 },
    { id: 'energia', name: 'Energia Solar', count: 4 },
  ];

  const products = [
    {
      id: 1,
      name: 'Kit Energia Solar Residencial',
      category: 'energia',
      price: 'R$ 2.890',
      originalPrice: 'R$ 3.200',
      discount: '10%',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop',
      eco_score: 95,
      points_earned: 150,
      sustainability: ['Energia Renovável', 'Reduz CO2', 'Economia de Energia'],
      description: 'Sistema completo de energia solar para residências de até 200m²',
    },
    {
      id: 2,
      name: 'Composteira Doméstica Inteligente',
      category: 'casa',
      price: 'R$ 189',
      originalPrice: 'R$ 220',
      discount: '14%',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      eco_score: 88,
      points_earned: 25,
      sustainability: ['Reduz Lixo Orgânico', 'Fertilizante Natural'],
      description: 'Transforme restos de comida em adubo orgânico para suas plantas',
    },
    {
      id: 3,
      name: 'Filtro de Água de Bambu',
      category: 'eco',
      price: 'R$ 79',
      originalPrice: 'R$ 95',
      discount: '17%',
      rating: 4.6,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=200&fit=crop',
      eco_score: 92,
      points_earned: 15,
      sustainability: ['Material Renovável', 'Reduz Plástico'],
      description: 'Filtro sustentável que purifica a água naturalmente',
    },
    {
      id: 4,
      name: 'Horta Vertical Automatizada',
      category: 'casa',
      price: 'R$ 445',
      originalPrice: 'R$ 520',
      discount: '14%',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      eco_score: 90,
      points_earned: 65,
      sustainability: ['Agricultura Urbana', 'Alimentos Orgânicos'],
      description: 'Sistema inteligente para cultivo de ervas e vegetais em casa',
    }
  ];

  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
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
              <h2 className="text-xl font-bold text-slate-800">Produtos Sustentáveis</h2>
              <p className="text-sm text-slate-600">Compras conscientes e responsáveis</p>
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

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 h-10 px-4 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25'
                    : 'bg-white/80 hover:bg-white border-green-200 text-slate-700'
                }`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="grid grid-cols-1 gap-4 pb-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border border-green-100/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="relative h-40">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Discount badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    -{product.discount}
                  </div>
                  
                  {/* Eco score */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium shadow-lg ${getEcoScoreColor(product.eco_score)}`}>
                    🌱 {product.eco_score}%
                  </div>
                  
                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(product.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-slate-500'
                      }`} 
                    />
                  </Button>
                </div>
                
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-slate-800 mb-2">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{product.description}</p>
                    
                    {/* Sustainability features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.sustainability.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-green-50 text-green-700 border border-green-200">
                          <Leaf className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rating and reviews */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews} avaliações)</span>
                  </div>
                  
                  {/* Price and points */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">{product.price}</span>
                      <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <Award className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">+{product.points_earned} pts</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 h-11 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg shadow-green-500/25 transition-all duration-300"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                    <Button 
                      variant="outline"
                      className="h-11 px-4 border-green-200 text-green-600 hover:bg-green-50 rounded-xl"
                    >
                      <Truck className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}