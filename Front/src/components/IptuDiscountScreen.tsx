import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Home, Percent } from 'lucide-react';

interface IptuDiscountScreenProps {
  onBack: () => void;
}

export function IptuDiscountScreen({ onBack }: IptuDiscountScreenProps) {
  const discounts = [
    { id: 1, percentage: 10, description: 'Pagamento em dia por 12 meses', available: true },
    { id: 2, percentage: 15, description: 'Pagamento à vista até março', available: true },
    { id: 3, percentage: 5, description: 'Primeira via do carnê digital', available: false },
    { id: 4, percentage: 20, description: 'Participação em programa ambiental', available: true },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Status bar space */}
      <div className="h-12"></div>
      
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Descontos IPTU</h2>
          </div>
        </div>

        {/* Lista de Descontos */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {discounts.map((discount) => (
            <div key={discount.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Percent className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-lg text-gray-800">{discount.percentage}% OFF</span>
                    <Badge variant={discount.available ? "default" : "secondary"} className="text-xs">
                      {discount.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {discount.description}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  disabled={!discount.available}
                  className="ml-4 h-8 px-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300"
                >
                  {discount.available ? "Aplicar" : "Em breve"}
                </Button>
              </div>
            </div>
          ))}

          {/* Informações adicionais */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1 text-sm text-gray-800">Como funciona</h4>
                <p className="text-xs text-gray-600">
                  Os descontos são aplicados automaticamente na próxima cobrança do IPTU. 
                  Verifique os critérios de cada desconto antes de aplicar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}