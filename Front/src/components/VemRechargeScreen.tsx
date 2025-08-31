import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, CreditCard, Clock, CheckCircle } from 'lucide-react';

interface VemRechargeScreenProps {
  onBack: () => void;
}

export function VemRechargeScreen({ onBack }: VemRechargeScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  
  const rechargeAmounts = [
    { value: 10, bonus: 0 },
    { value: 20, bonus: 2 },
    { value: 50, bonus: 7 },
    { value: 100, bonus: 20 },
  ];

  const recentTransactions = [
    { id: 1, amount: 20, date: '2024-01-15', status: 'completed' },
    { id: 2, amount: 50, date: '2024-01-10', status: 'completed' },
    { id: 3, amount: 30, date: '2024-01-05', status: 'pending' },
  ];

  const currentBalance = 15.50; // Saldo fictício

  const handleRecharge = () => {
    if (selectedAmount) {
      alert(`Recarga de R$${selectedAmount},00 realizada com sucesso!`);
      setSelectedAmount(null);
    }
  };

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
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Recarga VEM</h2>
          </div>
        </div>

        {/* Saldo Atual */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Saldo atual do cartão</p>
            <p className="text-2xl font-bold text-emerald-600">R${currentBalance.toFixed(2)}</p>
          </div>
        </div>

        {/* Valores de Recarga */}
        <div className="mb-4">
          <h3 className="font-semibold mb-3 text-gray-800">Escolha o valor da recarga</h3>
          <div className="grid grid-cols-2 gap-3">
            {rechargeAmounts.map((amount) => (
              <div 
                key={amount.value}
                className={`p-4 bg-white rounded-xl cursor-pointer transition-all border ${
                  selectedAmount === amount.value 
                    ? 'border-2 border-emerald-500 bg-emerald-50' 
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAmount(amount.value)}
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-800">R${amount.value},00</p>
                  {amount.bonus > 0 && (
                    <Badge className="mt-1 text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                      +R${amount.bonus} bônus
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de Recarga */}
        <div className="mb-4">
          <Button 
            onClick={handleRecharge}
            disabled={!selectedAmount}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300"
            size="lg"
          >
            {selectedAmount 
              ? `Recarregar R$${selectedAmount},00` 
              : 'Selecione um valor'
            }
          </Button>
        </div>

        {/* Histórico de Transações */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-semibold mb-3 text-gray-800">Últimas recargas</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {transaction.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm text-gray-800">R${transaction.amount},00</p>
                      <p className="text-xs text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                    {transaction.status === 'completed' ? 'Concluída' : 'Processando'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}