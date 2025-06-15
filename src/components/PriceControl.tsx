import React from 'react';
import { useSimulation } from '../contexts/SimulationContext';

const PriceControl: React.FC = () => {
  const { price, setPrice } = useSimulation();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setPrice(value);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Set Your Price</h2>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            min="1"
            max="100"
            value={price}
            onChange={handleInputChange}
            className="w-24 pl-7 pr-2 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="1"
          max="100"
          value={price}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>$1</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  );
};

export default PriceControl;