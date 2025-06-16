import React, { useState } from 'react';
import PriceControl from './PriceControl';
import MetricsDisplay from './MetricsDisplay';
import EventSection from './EventSection';
import MarketGraph from './MarketGraph';
import { useSimulation } from '../contexts/SimulationContext';
import { Target, BarChart } from 'lucide-react';

const Simulator: React.FC = () => {
  const { marketCondition, checkProfitMaximization, triggerRandomEvent, resetMarket } = useSimulation();
  const [showGraph, setShowGraph] = useState(false);
  const [showMaximization, setShowMaximization] = useState(false);
  const [maximizationResult, setMaximizationResult] = useState<{ isMaximized: boolean; maxPrice: number } | null>(null);

  const handleMaximizationCheck = () => {
    const result = checkProfitMaximization();
    setMaximizationResult(result);
    setShowMaximization(true);
  };

  const handleRandomEvent = () => {
    triggerRandomEvent();
    setShowMaximization(false);
    setShowGraph(false);
    setMaximizationResult(null);
  };

  const handleResetMarket = () => {
    resetMarket();
    setShowMaximization(false);
    setShowGraph(false);
    setMaximizationResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <header className="relative flex items-start mb-8">
        <div className="flex flex-col items-start flex-1">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span
              className="inline-block text-3xl"
              style={{ height: '2.25rem', width: '2.25rem' }}
            >
              <svg
                className="transition-transform drop-shadow-lg group-hover:animate-spin"
                style={{ height: '2.25rem', width: '2.25rem' }}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="22" fill="#FFD700" stroke="#B8860B" strokeWidth="4"/>
                <text x="24" y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#B8860B" fontFamily="Arial">$</text>
              </svg>
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Price it Right</h1>
          </div>
          <p className="text-lg text-gray-600 text-left">
            Adjust the price, see demand & profit, and react to market events
          </p>
        </div>
        <div className="flex gap-2 ml-4 mt-1">
          <button
            onClick={handleMaximizationCheck}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Target className="w-4 h-4" />
            <span>Check Profit</span>
          </button>
          {showMaximization && maximizationResult?.isMaximized && (
            <button
              onClick={() => setShowGraph(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <BarChart className="w-4 h-4" />
              <span>Show Graph</span>
            </button>
          )}
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Market Status</h2>
          <p className="text-gray-600">{marketCondition.description}</p>
        </div>

        {showMaximization && maximizationResult && (
          <div className={`mb-4 p-3 rounded-md ${maximizationResult.isMaximized ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <p className={maximizationResult.isMaximized ? 'text-green-700' : 'text-yellow-700'}>
              {maximizationResult.isMaximized 
                ? '🎯 Congratulations! Your price maximizes profit!'
                : `📈 Maximum profit can be achieved somewhere else.`
              }
            </p>
            <p className="text-sm mt-1 text-gray-600">
              💸The profit-maximizing price occurs where Marginal Revenue equals Marginal Cost
            </p>
          </div>
        )}

        <PriceControl />
        <MetricsDisplay />
        <EventSection onTriggerRandomEvent={handleRandomEvent} onResetMarket={handleResetMarket} />
      </div>
      
      {showGraph && (
        <MarketGraph 
          onClose={() => {
            setShowGraph(false);
          }}
          showMaximization={showMaximization}
        />
      )}
      
      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>
          Price it Right Simulator — Learn how pricing affects demand and profit |
          <span className="money" style={{ marginLeft: 4 }}>
            <a
              href="https://cleof.us"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: 12,
                fontWeight: 'bolder',
                display: 'inline-block',
              }}
              className="money-link"
            >
                    cleo
            </a>
          </span>
        </p>
        <style>{`
          .money-link:hover {
            animation: shine 1.5s linear infinite;
          }
          @keyframes shine {
            0% {
              background-position: 200% center;
            }
            100% {
              background-position: 0% center;
            }
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Simulator;