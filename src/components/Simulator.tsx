import React, { useState } from 'react';
import PriceControl from './PriceControl';
import MetricsDisplay from './MetricsDisplay';
import EventSection from './EventSection';
import MarketGraph from './MarketGraph';
import { useSimulation } from '../contexts/SimulationContext';
import { Target } from 'lucide-react';

const Simulator: React.FC = () => {
  const { marketCondition } = useSimulation();
  const [showGraph, setShowGraph] = useState(false);
  const [showMaximization, setShowMaximization] = useState(false);

  const handleMaximizationCheck = () => {
    setShowMaximization(true);
    setShowGraph(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="relative text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Price it Right</h1>
        <p className="text-lg text-gray-600">
          Adjust the price, see demand & profit, and react to market events
        </p>
        <div className="absolute right-0 top-0">
          <button
            onClick={handleMaximizationCheck}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Target className="w-4 h-4" />
            <span>Check Profit</span>
          </button>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Market Status</h2>
          <p className="text-gray-600">{marketCondition.description}</p>
        </div>

        <PriceControl />
        <MetricsDisplay />
        <EventSection />
      </div>
      
      {showGraph && (
        <MarketGraph 
          onClose={() => {
            setShowGraph(false);
            setShowMaximization(false);
          }}
          showMaximization={showMaximization}
        />
      )}
      
      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>Price it Right Simulator — Learn how pricing affects demand and profit</p>
      </footer>
    </div>
  );
};

export default Simulator;