import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-[375px] h-[812px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-background rounded-[2rem] overflow-hidden relative flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-green-800 mb-2">GreenPulse</h2>
              <p className="text-green-600">Carregando...</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};
