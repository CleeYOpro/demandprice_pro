import React from 'react';
import { useSimulation } from '../contexts/SimulationContext';

const MetricsDisplay: React.FC = () => {
  const { demand, profit } = useSimulation();
  
  // Calculate percentages for visualization
  const demandPercentage = Math.min(100, Math.max(0, (demand / 1000) * 100));
  const profitPercentage = Math.min(100, Math.max(0, (profit / 30000) * 100));

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Estimated Demand</h3>
        <div className="flex items-end mb-2">
          <span className="text-3xl font-bold text-gray-900">{demand.toFixed(0)}</span>
          <span className="ml-2 text-sm text-gray-600">units</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-orange-500 transition-all duration-300 ease-in-out"
            style={{ width: `${demandPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Estimated Profit</h3>
        <div className="flex items-end mb-2">
          <span className="text-3xl font-bold text-gray-900">${profit.toFixed(0)}</span>
        </div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-teal-500 transition-all duration-300 ease-in-out"
            style={{ width: `${profitPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;