import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Coins, ArrowRight } from 'lucide-react';

interface CoinExchangeScreenProps {
  onBack: () => void;
}

export function CoinExchangeScreen({ onBack }: CoinExchangeScreenProps) {
  const [coins, setCoins] = useState('');
  const userBalance = 1250; // Saldo fictício do usuário

  const exchangeOptions = [
    { id: 1, name: 'Desconto no IPTU', rate: 100, unit: 'R$1,00 de desconto' },
    { id: 2, name: 'Crédito VEM', rate: 50, unit: 'R$1,00 de crédito' },
    { id: 3, name: 'Vale-compras', rate: 200, unit: 'R$1,00 em compras' },
    { id: 4, name: 'Plantio de árvore', rate: 500, unit: '1 árvore' },
  ];

  const calculateValue = (coinsAmount: number, rate: number) => {
    return (coinsAmount / rate).toFixed(2);
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
            <Coins className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Troca de Moedas</h2>
          </div>
        </div>

        {/* Saldo */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Seu saldo atual</p>
            <p className="text-2xl font-bold text-emerald-600">{userBalance} moedas</p>
          </div>
        </div>

        {/* Calculadora de Troca */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <Label htmlFor="coins-input" className="text-sm text-gray-700">Quantidade de moedas para trocar</Label>
          <Input
            id="coins-input"
            type="number"
            placeholder="Digite a quantidade"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
            max={userBalance}
            className="mt-2 h-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>

        {/* Opções de Troca */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-semibold mb-3 text-gray-800">Opções de troca</h3>
          <div className="space-y-3">
            {exchangeOptions.map((option) => {
              const coinsAmount = parseInt(coins) || 0;
              const canAfford = coinsAmount >= option.rate && coinsAmount <= userBalance;
              const value = calculateValue(coinsAmount, option.rate);

              return (
                <div key={option.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-800">{option.name}</h4>
                      <p className="text-xs text-gray-600">
                        {option.rate} moedas = {option.unit}
                      </p>
                      {coinsAmount > 0 && (
                        <div className="flex items-center space-x-2 mt-2 text-xs">
                          <span className="font-medium text-gray-700">{coinsAmount} moedas</span>
                          <ArrowRight className="w-3 h-3" />
                          <span className="font-medium text-emerald-600">
                            {option.id === 4 ? `${Math.floor(coinsAmount / option.rate)} árvores` : `R$${value}`}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      disabled={!canAfford || coinsAmount === 0}
                      className="ml-4 h-8 px-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300"
                    >
                      Trocar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}